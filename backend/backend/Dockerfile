FROM python:3.7-apline
WORKDIR /code
RUN apk add --no-cache gcc musl-dev linux-headers
COPY requirements.txt requirements.txt
RUN pip install requirements.txt
EXPOSE 5000
COPY . .

CMD ['python manage.py runserver']