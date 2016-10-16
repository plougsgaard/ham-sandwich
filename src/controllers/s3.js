import {
  AWS_KEY,
  AWS_SECRET,
  AWS_REGION,
  AWS_BUCKET,
  AWS_FOOD_IMAGE_PATH
} from '../config'

import { isValidUUID } from './util'

const AWS = require('aws-sdk')

AWS.config.update({ accessKeyId: AWS_KEY, secretAccessKey: AWS_SECRET })
AWS.config.update({ region: AWS_REGION })

const s3 = new AWS.S3()

const getSignedUrlPromise = (actionKey, parameters) =>
  new Promise((resolve, reject) => {
    s3.getSignedUrl(actionKey, parameters, (err, url) => {
      if (err) {
        reject(err)
      } else {
        resolve(url)
      }
    })
  })

export const getSignedUrl = ({ Bucket, Key, actionKey }) =>
  getSignedUrlPromise(actionKey, { Bucket, Key, ContentType: 'application/octet-stream', ACL: 'public-read' })

export const getFoodImageUploadUrl = (foodId) => (
  getSignedUrl({
    Bucket: AWS_BUCKET,
    Key: `${AWS_FOOD_IMAGE_PATH}${foodId}`,
    actionKey: 'putObject'
  })
)
