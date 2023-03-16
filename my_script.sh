#!/bin/bash
wrk -t4 -c5 -d10 -s example.lua http://localhost:3333

# Set executable permission for this script
chmod +x "$0"