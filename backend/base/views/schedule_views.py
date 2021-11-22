from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from rest_framework.utils import serializer_helpers
from base.models import Course, Schedule, Lecture, AttendancePreference
from base.serializers import CourseSerializer, ScheduleSerializer

from rest_framework import status

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addLectures(request):
    user = request.user
    data = request.data

    lectures = data['lectures']
    if lectures and len(lectures) == 0:
        return Response({'detail': 'No Lectures'}, status=status.HTTP_400_BAD_REQUEST)
    else:
       # (1) Create Schedule
        schedule = Schedule.objects.create(
           user = user,
           #isAttended = data['isAttended'],
           #createdAt= data['createdAt'],
           #isOutdated= data['isOutdated'],
       )
       # (2) Create AttendancePreference
        attendancePreference = AttendancePreference.objects.create(
           schedule = schedule,
           attendOffline = data['attendancePreference']['attendOffline'],
           partiallyVaccinated = data['attendancePreference']['partiallyVaccinated'],
           firstDoseAt = data['attendancePreference']['firstDoseAt'],
           fullyVaccinated = data['attendancePreference']['fullyVaccinated'],
           secondDoseAt = data['attendancePreference']['secondDoseAt'],
       )
       # (3) Create Lecture and set Lecture and Schedule Relationship
        for i in lectures:
           course = Course.objects.get(_id=i['course'])
           item = Lecture.objects.create(
               course = course,
               schedule = schedule,
               name = course.name,
               #lec number / date,
               tutor = i['tutor'],
               image = course.image.url,  
           )
        
        # (4) Update lectures Schedule for particular user and not for all users.


        serializer = ScheduleSerializer(schedule, many=False)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMySchedules(request):
    user = request.user
    schedules = user.schedule_set.all()
    serializer = ScheduleSerializer(schedules, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getScheduleById(request, pk):
    user = request.user
    try:
        schedule = Schedule.objects.get(_id=pk)
        if user.is_staff or schedule.user ==user:
            serializer = ScheduleSerializer(schedule, many=False)
            return Response(serializer.data)
        else:
            return Response({
                'detail': 'Not authorized to view this schedule'}, 
                status=status.HTTP_400_BAD_REQUEST)

    except:
        return Response({
            'detail': 'Schedule does not exists'}, 
            status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateScheduleToAttended(request, pk):
    schedule = Schedule.objects.get(_id=pk)

    schedule.isAttended = True
    #schedule. attended at = datetime.now
    schedule.save()
    return Response('Scheduled Lectures were attended')
