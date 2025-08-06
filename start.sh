#!/bin/bash

# Start Python server in background
cd python-server
python3 index.py &

# Start Node server
cd ../node-server
node index.js