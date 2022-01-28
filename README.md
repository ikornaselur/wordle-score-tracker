# Worlde Score Tracker

Very very very very experimental and hacky Chrome extension + central server to track scores.

The idea is (and not completed) that you install the Chrome extension and
configure with an API URL, username and a secret token. Then when you play
Wordle of the day, after each guess, your row result (just the three colours)
are sent to the central server. 

This central server will track your results and update a daily message on Slack
as you play along, so that you'll be able to see how well others
(friends/family/coworkers/enemies) did during the day.
