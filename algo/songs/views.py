from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
import numpy as np
from songs.models import Song

def cos_sim(A, B):
  return np.dot(A, B)/(np.linalg.norm(A) * np.linalg.norm(B))

emotion_dict = {
  "excited" : {"여름", "청량", "신나는", "여행", "즐거운", "에너지", "댄스", "흥겨운", "시작"},
  "happy" : {"사랑", "설렘", "두근두근", "데이트", "고백", "생일", "기념", "행복", "상큼한", "새해", "축하", "시원한"},
  "relaxed" : {"휴가", "긍정적", "희망찬", "잔잔한", "기분좋은", "아침", "몽글몽글", "휴식", "힐링", "산책", "주말", "선선한", "봄", "편안한", "따스한"},
  "sentimental" : {"감성", "새벽", "그루브한", "쓸쓸한", "가을", "저녁", "위로", "센치한", "추억", "회상", "몽환적인", "아련한", "겨울", "짝사랑"},
  "sad" : {"이별", "쌀쌀한", "눈물", "그리움", "슬픈", "우울", "비오는날"},
  "angry" : {"질투", "분노"}
}

@api_view(["POST"])
def recommend(request):
  # print(request.data)  #: {'memberId': 3, 'memberHighPitch': 20, 'tagNameList': ['여름', '여행', '즐거운']}

  # df = pd.read_csv("SongDataCrawl.csv")
  df = pd.read_excel("SongDataCrawl.xlsx")

  user_vector_dict = {
    "excited" :0,
    "happy" :0,
    "relaxed" : 0,
    "sentimental" : 0,
    "sad" : 0,
    "angry" : 0
  }

  user = request.data

  # 유저 벡터 리스트
  for tag in user["tagNameList"]:
    for key in emotion_dict:
      if tag in emotion_dict[key]:
        user_vector_dict[key] += 1
        break

  user_vector_list = list(user_vector_dict.values())
  print(user_vector_list)

  # # 노래 유사도 측정
  result = []
  recommend_list = []

  # song_list = []
  user_high_pitch = user["memberHighPitch"]
  # # 한 키 낮은거
  low_song_list = Song.objects.filter(song_high_pitch=user_high_pitch-1)
  # song_list.append(low_song_list)

  # # 내 키 user["memberHighPitch"]
  # fit_song_list = Song.objects.filter(song_high_pitch=user_high_pitch)
  # song_list.append(fit_song_list)

  # # 한 키 높은거
  # high_song_list = Song.objects.filter(song_high_pitch=user_high_pitch+1)
  # song_list.append(high_song_list)

#  for list in song_list:
  for i in range(len(df)):
    song_vector_dict = {
      "excited" :0,
      "happy" :0,
      "relaxed" : 0,
      "sentimental" : 0,
      "sad" : 0,
      "angry" : 0
    }

    # 노래 벡터 리스트
    song_tag_dict = eval(df.song_tag[i])

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
      
    recommend_list.append({"song_num" : df.song_num[i], "score" : cos_sim(user_vector_list, song_vector_list)})

  recommend_list.sort(reverse=True, key=lambda x: x["score"])
  print(recommend_list)

  result.append(recommend_list)

  response = {
    result: result
  }
  return Response(response, status=status.HTTP_200_OK)