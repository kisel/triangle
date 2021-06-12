# Simple triangle calculator

### build

```bash
npm run build
```
copy build directory to destination


### deploy with S3

s3cmd put --acl-public -r ./build/* s3://apps/triangle-1/


