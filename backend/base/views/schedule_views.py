from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from django.contrib.auth.models import User
from rest_framework.utils import serializer_helpers
from base.models import Course
from base.serializers import CourseSerializer

from rest_framework import status