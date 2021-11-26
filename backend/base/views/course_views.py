from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Course
from base.serializers import CourseSerializer

from rest_framework import status

@api_view(['GET'])
def getCourses(request):
    courses = Course.objects.all()
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getCourse(request, pk):
    course = Course.objects.get(_id=pk)
    serializer = CourseSerializer(course, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createCourse(request):
    user = request.user
    course = Course.objects.create(
        user = user,
        name = 'Sample Name',
        tutor = 'Sample Tutor ',
        lecturesScheduled = 0,
        description = 'Sample Description',
    )

    serializer = CourseSerializer(course, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateCourse(request, pk):
    data = request.data
    course = Course.objects.get(_id=pk)

    course.name = data['name']
    course.tutor = data['tutor']
    course.description = data['description']
    course.lecturesScheduled = data['lecturesScheduled']
    course.save()
    
    serializer = CourseSerializer(course, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteCourse(request, pk):
    course = Course.objects.get(_id=pk)
    course.delete()
    return Response('Course Deleted')

@api_view(['POST'])
def uploadImage(request):
    data = request.data
    course_id = data['course_id']
    course = Course.objects.get(_id=course_id)

    course.image = request.FILES.get('image')
    course.save()
    return Response('Image was uploaded')