FROM python:3.9.5-slim-buster
COPY . ./flask-backend
WORKDIR ./flask-backend
RUN pip install --no-cache-dir -i https://pypi.tuna.tsinghua.edu.cn/simple -r requirements.txt
ENTRYPOINT ["python","-m","flask","run","--host=0.0.0.0","--port=5555"]