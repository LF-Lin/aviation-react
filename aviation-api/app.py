from flask import Flask, render_template, request, redirect
from forms import Todo
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = 'password'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tmp/test.db'
db = SQLAlchemy(app)


class TodoModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(256))
    
    def __str__(self):
        return f'{self.content}, {self.id}'


@app.route('/todo', methods=['GET', 'POST'])
def todo():
    todo_form = Todo()
    if todo_form.validate_on_submit():
        task = TodoModel(content=todo_form.content.data)
        db.session.add(task)
        db.session.commit()
        return redirect('/')
    return render_template('todo.html', **locals())


@app.route('/about', methods=['GET', 'POST'])
def about():
    if request.method == 'POST':
        user_data = request.form
        return user_data
    return render_template('about.html')


@app.route('/')
def hello_world():
    tasks = TodoModel.query.all()
    return render_template('index.html', **locals())


if __name__ == '__main__':
    app.run(debug=True, port=5555)
