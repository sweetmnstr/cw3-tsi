#!/bin/bash
dd if=/dev/zero of=/oio/rawx.img bs=1G count=1
mkfs.xfs /oio/rawx.img


mkdir -p /var/lib/oio/sds/OPENIO/meta0-0
mkdir -p /var/lib/oio/sds/OPENIO/meta1-0
mkdir -p /var/lib/oio/sds/OPENIO/meta2-0
mkdir -p /var/lib/oio/sds/OPENIO/redis-0
mkdir -p /var/lib/oio/sds/OPENIO/rawx-0


mount -o loop /oio/rawx.img /var/lib/oio/sds/OPENIO/rawx-0

chown -R openio:openio /var/lib/oio/sds/OPENIO/meta0-0
chown -R openio:openio /var/lib/oio/sds/OPENIO/meta1-0
chown -R openio:openio /var/lib/oio/sds/OPENIO/meta2-0
chown -R openio:openio /var/lib/oio/sds/OPENIO/redis-0
chown -R openio:openio /var/lib/oio/sds/OPENIO/rawx-0


chmod -R 755 /var/lib/oio/sds/OPENIO/meta0-0
chmod -R 755 /var/lib/oio/sds/OPENIO/meta1-0
chmod -R 755 /var/lib/oio/sds/OPENIO/meta2-0
chmod -R 755 /var/lib/oio/sds/OPENIO/redis-0
chmod -R 755 /var/lib/oio/sds/OPENIO/rawx-0

/openio-docker-init.sh
