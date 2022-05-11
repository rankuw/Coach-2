sudo -i
mv /home/ec2-user/coach_project_dev_backend_artifact.tar.gz /var/www/html/coach_project/backend/dev/
cd /var/www/html/coach_project/backend/dev/
tar -xzf coach_project_dev_backend_artifact.tar.gz
rm -rf coach_project_dev_backend_artifact.tar.gz
chown -R coach_user:coach_user /var/www/html/coach_project/backend/dev/
pwd
ls -la
su coach_user
cp env.dev .env
ls -la
cd /var/www/html/coach_project/backend/
pm2 delete npm -- run dev
pm2 start npm -- run dev
