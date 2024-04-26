from flask import Flask,request,render_template

app=Flask(__name__)

## Route for a home page
@app.route('/',methods=['GET'])
def index():
    return render_template('code.html') 

@app.route('/singlePlayer')
def single_player():
    return render_template('singlePLAYER.html')

@app.route('/twoPlayer')
def two_player():
    return render_template('twoPLAYER.html')

if __name__ == '__main__':
    app.run(debug=True)
