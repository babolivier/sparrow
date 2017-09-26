# Sparrow

[![Build Status](https://jenkins.brendanabolivier.com/buildStatus/icon?job=Sparrow)](https://jenkins.brendanabolivier.com/job/Sparrow/)

Sparrow is a front-end forum software using a [Matrix](https://matrix.org) homeserver
as its back-end. This means that, as long as you have a homeserver set up somewhere,
hosting Sparrow will only consist in serving its front-end content and pointing it
to the said homeserver.

N.B.: Although this is technically possible, it is highly recommended not to point
Sparrow to the matrix.org homeserver, as the computation of the list of topic
will be made really slow because of the number of public rooms on this server
and the current performances of the Matrix public rooms directory computation in
[Synapse](https://github.com/matrix-org/synapse).

## Development status

This project is still under heavy development, and might change in a drastic way
without any warning. It is far from being ready for production.

## Contribute

Coming soon (even though I hate READMEs saying that)...

## Get in touch

You can join the chat on Sparrow by joining the [#sparrow:matrix.org](https://matrix.to/#/#sparrow:matrix.org)
room on Matrix. If you prefer to get in touch privately, you can drop an email
at <sparrow@brendanabolivier.com>.
