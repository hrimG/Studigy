from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .courses import courses
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/courses',
        '/api/courses/25',
        '/api/courses/create',
        '/api/courses/update/25',
        '/api/courses/delete/25',
    ]
    return Response(routes)

@api_view(['GET'])
def getCourses(request):
    return Response(courses)

@api_view(['GET'])
def getCourse(request, pk):
    course = None
    for i in courses:
        if i['_id'] == pk:
            course = i
            break
    return Response(course)