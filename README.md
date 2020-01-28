# Huemotion

## Overview

This is a progressive web app that predicts emotions in real-time using a serverless architecture.

Images are captured from a web cam and sent to an AWS Lambda function which serves an inference model for facial expression recognition.

## URLs

- App: https://huemotion.sudosharma.com
- Lambda Function Source Code: https://github.com/SudoSharma/huemotion_backend

## Goals

This app was developed with the following constraints and goals in mind:
1. Use a modern stack of tools with built-in security features, performance benefits, and ease of deployment.
2. Create a repeatable model for all other ML projects in the future.
3. Insofar as this approach can be repeatable/scalable, it must be **cheap**. 

## The Modern ML Deployment Stack (JAM-X)

Uses JAMstack approach to serve open format ML models. Called "JAM-X" because it relies on JAMstack principles, a serverless compute service, and ONNX, an open format to represent ML models that are platform- or framework-agnostic. 

My approach uses the following stack, the individal modules of which can be swapped out as needed:
1. [Gatsby](https://www.gatsbyjs.org/) (a static site generator)
2. [React](https://reactjs.org/) (a powerful front-end framework)
3. [Netlify](https://www.netlify.com/) (a JAMstack serverless hosting provider)
4. [AWS Lambda](https://aws.amazon.com/lambda/) (a serverless compute service)
5. [AWS s3](https://aws.amazon.com/s3/) (a simple cloud storage solution) 
6. [ONNX](https://onnx.ai/) (an open format that enables interoperability between ML frameworks)
7. [Flask](http://flask.palletsprojects.com/en/1.1.x/) (a microframework for serving python apps)

These tools allow you to easily deploy a blazingly-fast web application that doesn't rely on any cumbersome infrastructure, driving down the cost and ramping up the ease of development. I believe this can be a powerful approach for deploying new ML projects going forward. 

### Here's how it works:

#### Deployment
Once you develop a compelling UI using React, Gatsby creates a static development bundle of all project files. These are then deployed to Netlify with GitHub integration for version-controlled goodness and atomic continuous deployment (no assets or dependencies are ever out of sync). Netlify provides an application URL which can then be mapped to a custom domain using CNAME, as I have done to a subdomain under my website: https://huemotion.sudosharma.com 

#### Static 
Since Gatsby has pre-compiled all HTML files and Netlify has placed them in a nearby CDN, when a client visits the site, all requested resources are simply fetched and displayed. No time is wasted in rendering content "on-the-fly". This is the "static" nature of this endeavor. 

#### Dynamic
Next, since this is a facial emotion recognition application, the client is asked to share their web cam stream. This stream is converted into image frames, which are piped to an AWS Lambda function via a series of sequential API requests. At the other end is a patiently waiting Flask app which pulls an facial expression recognition ONNX model from an AWS S3 bucket, and uses the ONNX Runtime library to predict an emotion for every given frame (AWS launches concurrent lambda functions). This prediction is returned to the client and a state change triggers a re-render of the UI. This introduces dyanmism into our static web app.  

## Latency and Cost

The latency in this application is all in the AWS Lambda function. The first API call (and hence the first image sent) "wakes up" the function, and roughly 333ms later, a response is shown to the client. Because of this, I'm only capturing 3 frames per second from the client. This is the fastest response we are able to generate in this situation because of the inference time, and AWS limitations on lambda resources. 

To improve this further, we could try removing CORS handling (which requires a pre-flight request, and other kinds of overhead nonsense), by hosting the static website files in the same place as the AWS Lambda function (instead of in Netlify's CDNs). 

In terms of costs, hosting on Netlify is free, and at least for my purposes, running the Lambda function is **$0.000005 per image frame**, and **$0.20 every 1M requests**. The free tier however offers 1M requests per month. 

## To Run Locally

To try out this app locally, there's just two simple steps. First, make sure you have npm installed and clone this repository. Then:
1. Run `npm install`
2. Run `gatsby develop`

## Suggestions

Please feel free to suggest improvements by filing an issue, or creating a pull request.
