FROM python:3.9

WORKDIR /server

COPY . .

RUN pip install Flask
RUN pip install Flask-Bcrypt
RUN pip install -U flask-cors
RUN pip install Flask-RESTful
RUN pip install Flask-Migrate
RUN pip install SQLAlchemy-serializer
RUN pip install Faker

RUN python seed.py

EXPOSE 5555

CMD ["python", "app.py"]