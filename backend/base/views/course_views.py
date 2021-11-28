from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from base.models import Course, Comment
from base.serializers import CourseSerializer

from rest_framework import status

@api_view(['GET'])
def getCourses(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''
    
    courses = Course.objects.filter(name__startswith=query)
    serializer = CourseSerializer(courses, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getTopCourses(request):
    courses = Course.objects.filter(difficulty__gte=4).order_by('-difficulty')[0:5]
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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createCourseComment(request, pk):
    user = request.user
    course = Course.objects.get(_id=pk)
    data = request.data

    #1 Comment already exist
    alreadyExists = course.comment_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Already posted for the Course'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #2 No difficulty or 0
    elif data['difficulty'] == 0:
        content = {'detail': 'Please select a difficulty'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #3 Create comment / doubt
    else:
        comment = Comment.objects.create(
            user = user,
            course = course,
            name = user.first_name,
            difficulty= data['difficulty'],
            content = data['content'], 
        )

        comments = course.comment_set.all()
        course.numComments = len(comments)

        total = 0
        for i in comments:
            total += i.difficulty
        course.difficulty = total / len(comments)
        course.save()

        return Response('Comment Added')