from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Course)
admin.site.register(Comment)
admin.site.register(Schedule)
admin.site.register(Lecture)
admin.site.register(AttendancePreference)
