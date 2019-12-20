---
calendar: thecloud
post_year: 2019
post_day: 21
title: Tesla Sentry with AWS Rekognition
ingress: >-
  Teslas are the most technologically advanced cars on the market right now. One
  interesting feature is called Sentry Mode, it's a built-in security system
  that uses 4 (out of 8) cameras to continuously monitoring the surroundings of
  the car. Unfortunately, there is no way to watch the videos remotely, they
  have to be stored on a USB drive that’s plugged into the car. That’s very
  impractical, it takes only a few days before there are too many videos and you
  end up just ignoring them.


  In this post, I want to describe how I’m trying to use video content analysis
  to determine if there is a person on any video and then send a notification to
  the owner. I’m using Azure for archiving the videos and AWS to process them.


  ![alt-tekst til bilde](https://i.ibb.co/ws9NYRg/Tesla-Sentry-Vision.png)
links:
  - title: Tesla USB
    url: github.com/marcone/teslausb
authors:
  - Nordine Ben Bachir
---
## Archiving dashcam footage to the cloud

I use a Raspberry Pi Zero to emulate a USB mass storage so that the car writes dashcam footage to it. There is an open source project called Teslausb that can be used for that. I recommend [this fork](github.com/marcone/teslausb) because it has a prebuilt image and a nice one-step setup. I’m using Azure File Storage because it supports SMB protocol out of the box. Here is my configuration:

```
export ARCHIVE_SYSTEM=cifs
export archiveserver=teslavision.file.core.windows.net
export sharename=videos
export shareuser=teslavision
export sharepassword='primary_key_from_azure_storage'
export camsize=32G
export SSID='garage_wifi_ssid'
export WIFIPASS='your_wifi_password'
export HEADLESS_SETUP=true
```

Once the Raspberry Pi is configured and plugged in, it starts archiving Tesla Sentry dashcam footage to Azure File Storage as soon as the configured Wifi network is accessible. The next step is to run video content analysis to determine if there is a person on any of the videos.

## Video Content Analysis

Azure Computer Vision would be a good fit here since I’m already using Azure File Storage, but unsupervised object detection only works on images and not videos 😔. That would require preprocessing all videos with ffmpeg for frame extraction and then running Azure Computer Vision on thousands of frames. A show-stopper for me.

Amazon Rekognition is able to perform unsupervised object detection on videos stored in a S3 bucket, but it’s a little bit more complicated because it's asynchronous. Video analysis is triggered by calling the [StartLabelDetection](https://docs.aws.amazon.com/rekognition/latest/dg/API_StartLabelDetection.html) operation and the completion status of the request is published to an Amazon SNS topic. The result is retrieved by calling [GetLabelDetection](https://docs.aws.amazon.com/rekognition/latest/dg/API_GetLabelDetection.html).

## Putting it all together

I use Azure Container Instances (ACI) to copy videos from Azure File Storage to S3 and then trigger AWS Rekognition. Then a Lambda function is triggered and the result for the operation is retrieved. If a person has been detected, I use pushover.net to send a notification to my phone.

## Results

It turns out that detecting people on videos is not as easy as I thought and quite unreliable. There are a few things I want to change in my current solution:

* Azure File Storage doesn’t provide triggers/events, so my container has to run every 5 minutes to check for new files. I’m going to use [RClone](https://github.com/cimryan/teslausb/blob/master/doc/SetupRClone.md) to archive the videos directly to a S3 bucket and use a Lambda function instead of Azure ACI, thus running everything on AWS. 
* I only use the front camera for the moment, I’m going to merge all clips together on the Raspberry Pi before archiving to the cloud. [This python project](https://pypi.org/project/tesla-dashcam/) seems to do exactly what I want.
* It should be possible to extract all the frames containing a person and then run face recognition on them.
* It should be possible to view the videos remotely, right now I need to mount the Azure File Share on my computer in order to access the video archive.
