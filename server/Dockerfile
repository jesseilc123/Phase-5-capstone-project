FROM python:3.12.0rc1-alpine

WORKDIR /server

COPY . .

RUN pip install

# RUN pipenv shell

EXPOSE 5555

CMD ["python", "app.py"]