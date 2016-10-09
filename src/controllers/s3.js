import {
  AWS_KEY,
  AWS_SECRET,
  AWS_REGION,
  AWS_BUCKET
} from '../config'

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
  getSignedUrlPromise(actionKey, { Bucket, Key, ContentType: 'application/octet-stream' })

export const getFoodImageUploadUrl = (foodId) => (
  getSignedUrl({
    Bucket: AWS_BUCKET,
    Key: foodId,
    actionKey: 'putObject'
  })
)
