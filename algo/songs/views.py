from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
import numpy as np
from songs.models import Song, SongLevel
from surprise import Reader, Dataset, SVD, accuracy
from surprise.model_selection import train_test_split
from surprise.dataset import DatasetAutoFolds


def cos_sim(A, B):
    return np.dot(A, B)/(np.linalg.norm(A) * np.linalg.norm(B))


emotion_dict = {
    "excited": {"여름", "청량", "신나는", "여행", "즐거운", "에너지", "댄스", "흥겨운", "시작"},
    "happy": {"사랑", "설렘", "두근두근", "데이트", "고백", "행복", "상큼한", "새해", "시원한"},
    "relaxed": {"휴가", "긍정적", "희망찬", "잔잔한", "기분좋은", "아침", "몽글몽글", "휴식", "힐링", "산책", "주말", "선선한", "봄", "편안한", "따스한"},
    "sentimental": {"감성", "새벽", "그루브한", "쓸쓸한", "가을", "저녁", "위로", "센치한", "추억", "회상", "몽환적인", "아련한", "겨울", "짝사랑"},
    "sad": {"이별", "쌀쌀한", "눈물", "그리움", "슬픈", "우울", "비오는날"},
    "angry": {"질투", "분노"}
}


@api_view(["POST"])
def recommend(request):

    # 1. total_song_list를 가져오기
    # 2. 평가 데이터 가져와서 정제해주기. (pivot table)
    # 3. 알고리즘 돌리기.
    ##################################
    # 협업 필터링 학습
    song_level_list = SongLevel.objects.all().values()
    song_level_df = pd.DataFrame(song_level_list, columns=[
                                 'member_id', 'song_id', 'song_level'])
    reader = Reader(line_format='user item rating timestamp', sep=',', rating_scale=(1.0, 4.0))
    data_folds = DatasetAutoFolds(df=song_level_df, reader=reader)
    trainset = data_folds.build_full_trainset()
    algo = SVD(n_factors=50, n_epochs=20, random_state=42)
    algo.fit(trainset)

    # 정확도 체크
    # predictionsCheck = algo.test( testset )
    # accuracy.rmse(predictions)
    #################################
    # print(request.data)  #: {'memberId': 3, 'memberHighPitch': 20, 'tagNameList': ['여름', '여행', '즐거운']}

    # songs = Song.objects.all().values()

    user_vector_dict = {
        "excited": 0,
        "happy": 0,
        "relaxed": 0,
        "sentimental": 0,
        "sad": 0,
        "angry": 0
    }

    user = request.data

    # 유저 벡터 리스트
    for tag in user["tagNameList"]:
        for key in emotion_dict:
            if tag in emotion_dict[key]:
                user_vector_dict[key] += 1
                break

    user_vector_list = list(user_vector_dict.values())
    # print(user_vector_list)

    # 노래 유사도 측정
    result = []
    song_list = []
    user_high_pitch = user["memberHighPitch"]
    # 키 낮은거 (-4키까지)
    # print(user_high_pitch)
    low_song_list = Song.objects.filter(
        song_high_pitch__gte=user_high_pitch-4, song_high_pitch__lte=user_high_pitch-2).values()
    song_list.append(low_song_list)

    # 내 키 user["memberHighPitch"] , -1
    fit_song_list = Song.objects.filter(
        song_high_pitch__gte=user_high_pitch-1, song_high_pitch__lte=user_high_pitch).values()
    song_list.append(fit_song_list)

    # 키 높은거(+4키까지)
    high_song_list = Song.objects.filter(
        song_high_pitch__gte=user_high_pitch+1, song_high_pitch__lte=user_high_pitch+3).values()
    song_list.append(high_song_list)

    for songs in song_list:
        recommend_list = []

        # 협업 필터링
        predictions = [algo.predict(user["memberId"], song["song_id"])
                       for song in songs]

        # 1easy 2good 3hard 4hell
        # 0.25   0.4   0.25   0.1
        # x
        # 1~4 점으로 나오면 이걸 치환해
        # 0.3 0.4 0.2 0.1
        # |2 - est| 0이 가까울수록 좋다.

        for i in range(len(songs)):
            song_vector_dict = {
                "excited": 0,
                "happy": 0,
                "relaxed": 0,
                "sentimental": 0,
                "sad": 0,
                "angry": 0
            }

            # 노래 벡터 리스트
            song_tag_dict = eval(songs[i]["song_tag"])

            for tag in song_tag_dict:
                for key in emotion_dict:
                    if tag in emotion_dict[key]:
                        song_vector_dict[key] += song_tag_dict[tag]

            song_vector_list = list(song_vector_dict.values())
            sum_temp = sum(song_vector_list)
            if (sum_temp == 0):
                continue

            for j in range(6):
                song_vector_list[j] /= sum_temp

            # 컨텐츠 기반 필터링 예측값
            computed_val = cos_sim(user_vector_list, song_vector_list)
            pred = round(abs(abs(2 - predictions[i][-2]) - 2) / 2, 2)
            final_val = computed_val * 0.9 + pred * 0.1

            # print(computed_val, predictions[i][-2], pred, final_val)

            if (final_val > 0.7):
                # recommend_list.append({"song_num" : songs[i]["song_num"], "score" : computed_val})
                recommend_list.append({"songId": songs[i]["song_id"], "songTitle": songs[i]["song_title"], "songSinger": songs[i]["song_singer"],
                                       "songImageUrl": songs[i]["song_image_url"], "songTj": songs[i]["song_tj"], "songKy": songs[i]["song_ky"],
                                       "songHighPitch": songs[i]["song_high_pitch"], "score": computed_val})
                print(songs[i]["song_tag"])

        recommend_list.sort(reverse=True, key=lambda x: x["score"])

        result.append(recommend_list[0:30])

    return Response(result, status=status.HTTP_200_OK)
