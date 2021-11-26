from django.db import models
from django.contrib.auth.models import User
from django.db.models.base import Model

# Create your models here.

class Course(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    image = models.ImageField(null=True, blank=True, default='/sample.jpg')
    description = models.TextField(null=True, blank=True)
    difficulty = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    tutor = models.CharField(max_length=200, null=True, blank=True)
    lecturesScheduled = models.IntegerField(null=True, blank=True, default=0)
    numComments = models.IntegerField(null=True, blank=True, default=0)
    createdAt = models.DateTimeField(auto_now_add=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

class Comment(models.Model):
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    difficulty = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.difficulty)

class Schedule(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    isAttended = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    isOutdated = models.BooleanField(default=False)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self._id)

class Lecture(models.Model):
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True)
    schedule =  models.ForeignKey(Schedule, on_delete=models.SET_NULL, null=True)
    name = models.CharField(max_length=200, null=True, blank=True)
    tutor = models.CharField(max_length=200, null=True, blank=True)
    image = models.CharField(max_length=200, null=True, blank=True)
    #date
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name

class AttendancePreference(models.Model):
    schedule = models.OneToOneField(Schedule, on_delete=models.CASCADE, null=True, blank=True)
    attendOffline = models.BooleanField(default=False)
    partiallyVaccinated = models.BooleanField(default=False)
    firstDoseAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    fullyVaccinated = models.BooleanField(default=False)
    secondDoseAt = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    _id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return str(self.attendOffline)