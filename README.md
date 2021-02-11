git add .
git commit -am ""
git push heroku master
heroku ps:scale web=1
heroku open