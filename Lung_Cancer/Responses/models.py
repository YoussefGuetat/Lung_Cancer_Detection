from django.db import models
from django.utils import timezone
from Users.models import Patient
from Questions.models import Question

class Response(models.Model):
    user = models.ForeignKey(Patient, on_delete=models.CASCADE)  
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    text_response = models.TextField(blank=True, null=True) #text question
    numeric_response = models.IntegerField(blank=True, null=True) #rating quetsion
    bool_response = models.BooleanField(blank=True, null=True) #yes/no/maybe question
    emoji_response = models.CharField(max_length=10, blank=True, null=True) #emoji question
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"Response to '{self.question.text}' by {self.user.username}"
