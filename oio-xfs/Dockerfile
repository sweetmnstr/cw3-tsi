# Use a base image that includes necessary tools, Ubuntu in this case
FROM openio/sds

# Install necessary packages
RUN yum -y install xfsprogs \
    util-linux \
    epel-release \
    gosu \
    && yum clean all

# Copy the entrypoint script into the container
COPY entrypoint.sh /entrypoint.sh

# Make the entrypoint script executable
RUN chmod +x /entrypoint.sh

# Set the entrypoint script to run on container start
ENTRYPOINT ["/entrypoint.sh"]
