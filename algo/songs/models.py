from django.db import models

class Magazine(models.Model):
    megazine_id = models.BigAutoField(primary_key=True)
    magazine_content = models.CharField(max_length=1000, blank=True, null=True)
    magazine_image_url = models.CharField(max_length=500, blank=True, null=True)
    magazine_title = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'magazine'


class MagazineSong(models.Model):
    megazine_song_id = models.BigAutoField(primary_key=True)
    magazine = models.ForeignKey(Magazine, models.DO_NOTHING)
    song = models.ForeignKey('Song', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'magazine_song'


class Member(models.Model):
    member_id = models.BigAutoField(primary_key=True)
    member_email = models.CharField(max_length=100, blank=True, null=True)
    member_high_pitch = models.IntegerField()
    member_nickname = models.CharField(max_length=30, blank=True, null=True)
    member_profile_url = models.CharField(max_length=500, blank=True, null=True)
    member_role = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'member'


class MemberTag(models.Model):
    member_tag_id = models.BigAutoField(primary_key=True)
    member = models.ForeignKey(Member, models.DO_NOTHING, blank=True, null=True)
    tag = models.ForeignKey('Tag', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'member_tag'


class Playlist(models.Model):
    playlist_id = models.BigAutoField(primary_key=True)
    magazine = models.ForeignKey(Magazine, models.DO_NOTHING, blank=True, null=True)
    song = models.ForeignKey('Song', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'playlist'


class RefreshToken(models.Model):
    refresh_token_id = models.BigAutoField(primary_key=True)
    refresh_token = models.CharField(max_length=500, blank=True, null=True)
    member = models.ForeignKey(Member, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'refresh_token'


class Shorts(models.Model):
    shorts_id = models.BigAutoField(primary_key=True)
    shorts_audio_url = models.CharField(max_length=500, blank=True, null=True)
    shorts_comment = models.CharField(max_length=300, blank=True, null=True)
    shorts_create_time = models.DateTimeField(blank=True, null=True)
    member = models.ForeignKey(Member, models.DO_NOTHING, blank=True, null=True)
    song = models.ForeignKey('Song', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'shorts'


class ShortsLike(models.Model):
    shorts_like_id = models.BigAutoField(primary_key=True)
    member = models.ForeignKey(Member, models.DO_NOTHING)
    shorts = models.ForeignKey(Shorts, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'shorts_like'


class Song(models.Model):
    song_id = models.BigAutoField(primary_key=True)
    song_genre = models.CharField(max_length=50, blank=True, null=True)
    song_high_pitch = models.IntegerField()
    song_image_url = models.CharField(max_length=500, blank=True, null=True)
    song_ky = models.CharField(max_length=10, blank=True, null=True)
    song_num = models.IntegerField()
    song_singer = models.CharField(max_length=50, blank=True, null=True)
    song_tag = models.CharField(max_length=500, blank=True, null=True)
    song_title = models.CharField(max_length=100, blank=True, null=True)
    song_tj = models.CharField(max_length=10, blank=True, null=True)
    song_like_count = models.IntegerField()
    song_eval_count = models.IntegerField()
    song_lyrics = models.CharField(max_length=500, blank=True, null=True)
    song_level = models.IntegerField()
    song_album = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'song'


class SongLevel(models.Model):
    song_level_id = models.BigAutoField(primary_key=True)
    song_level = models.IntegerField(blank=True, null=True)
    member = models.ForeignKey(Member, models.DO_NOTHING, blank=True, null=True)
    song = models.ForeignKey(Song, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'song_level'


class SongLike(models.Model):
    song_like_id = models.BigAutoField(primary_key=True)
    member = models.ForeignKey(Member, models.DO_NOTHING, blank=True, null=True)
    song = models.ForeignKey(Song, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'song_like'


class Tag(models.Model):
    tag_id = models.BigAutoField(primary_key=True)
    tag_name = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tag'