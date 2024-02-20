#!/usr/bin/env python3
"""
Module for reading and writing data to file
"""
import json
from flask import Flask, jsonify, request, abort, make_response
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)

cors = CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/posts', methods=["GET"], strict_slashes=False)
def get_posts():
    """get posts"""
    with open('data/db.json', 'r') as db:
        data = json.load(db)
    return jsonify(data["posts"])


@app.route('/posts', methods=["POST"], strict_slashes=False)
def new_post():
    """new posts"""
    if not request.get_json():
        abort(404)
    post = request.get_json()
    with open('data/db.json', 'r') as db:
        data = json.load(db)
    time = datetime.now()
    post["datetime"] = time.strftime("%b %d, %Y %I:%M:%S %p")
    data["posts"].append(post)
    with open('data/db.json', 'w') as db:
        json.dump(data, db)
    
    return jsonify(post)


@app.route('/posts/<post_id>', methods=["DElETE"], strict_slashes=False)
def delete_post(post_id):
    """new posts"""
    if not post_id:
        abort(404)
    with open('data/db.json', 'r') as db:
        data = json.load(db)
        posts = data["posts"]
    for post in posts:
        if post["id"] == int(post_id):
            posts.remove(post)
            print(post)
    
    with open('data/db.json', 'w') as db:
        json.dump({"posts": posts}, db)
    
    return make_response("Done", 200)


@app.route('/posts/', methods=["PUT"], strict_slashes=False)
def update_post():
    """new posts"""

    if not request.get_json():
        abort(404)
    
    post = request.get_json()
    with open('data/db.json', 'r') as db:
        data = json.load(db)
        posts = data["posts"]

    time = datetime.now()
    post["datetime"] = time.strftime("%b %d, %Y %I:%M:%S %p")

    for i in range(len(posts)):
        if posts[i]["id"] == post["id"]:
            posts[i] = post
    
    with open('data/db.json', 'w') as db:
        json.dump({"posts": posts}, db)
    
    return jsonify(post)


if __name__ == "__main__":
    app.run(debug=True)
