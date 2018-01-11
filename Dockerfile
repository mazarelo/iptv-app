FROM ubuntu

#RUN add-apt-repository -y -r ppa:chris-lea/node.js
#RUN rm -f /etc/apt/sources.list.d/chris-lea-node_js-*.list
RUN apt-get update 
RUN apt-get install -y software-properties-common python
RUN add-apt-repository ppa:chris-lea/node.js
RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y nodejs

RUN mkdir /var/www
# Install Cordova
RUN npm install -g cordova ionic

ADD app.js /var/www/app.js
CMD ["/usr/bin/node", "/var/www/app.js"] 
