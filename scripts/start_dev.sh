sudo -i
mv /home/ec2-user/coach_project_dev_backend_artifact.tar.gz /var/www/html/coach_project/backend/dev/
cd /var/www/html/coach_project/backend/dev/
tar -xzf coach_project_dev_backend_artifact.tar.gz
rm -rf coach_project_dev_backend_artifact.tar.gz
chown -R coach_user:coach_user /var/www/html/coach_project/backend/dev/
pwd
ls -la
su coach_user
mkdir environments
cp env.dev .env.dev && mv .env.dev environments/
ls -la
pm2 delete dev
tsc && NODE_ENV=dev pm2 start dist/index.js --name dev
