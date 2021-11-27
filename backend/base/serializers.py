from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Course, Schedule, Lecture, AttendancePreference, Comment

class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']
    
    def get__id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.email

        return name

class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    comments = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Course
        fields = '__all__'

    def get_comments(self, obj):
        comments = obj.comment_set.all()
        serializer = CommentSerializer(comments, many = True)
        return serializer.data

class AttendancePreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttendancePreference
        fields = '__all__'

class LectureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lecture
        fields = '__all__'

class ScheduleSerializer(serializers.ModelSerializer):
    lectures = serializers.SerializerMethodField(read_only=True)
    attendancePreference = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Schedule
        fields = '__all__'

    def get_lectures(self, obj):
        items = obj.lecture_set.all()
        serializer = LectureSerializer(items, many=True)
        return serializer.data

    def get_attendancePreference(self, obj):
        try:
            ap = AttendancePreferenceSerializer(
                obj.attendancepreference, many=False).data
        except:
            ap = False
        return ap

    def get_user(self, obj):
        items = obj.user
        serializer = UserSerializer(items, many=False)
        return serializer.data