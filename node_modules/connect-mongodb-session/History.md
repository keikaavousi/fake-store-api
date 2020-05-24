2.3.2 / 2020-05-19
==================
 * fix: bump archetype -> 0.11.x #82 [ThomasCrevoisier](https://github.com/ThomasCrevoisier)

2.3.1 / 2020-02-06
==================
 * fix: enable `useUnifiedTopology` connection option by default to suppress deprecation warning #77 [alpn](https://github.com/alpn)

2.3.0 / 2020-01-20
==================
 * fix: upgrade mongodb -> 3.5.x

2.2.0 / 2019-06-15
==================
 * chore: upgrade mongodb -> 3.2.x

2.1.1 / 2019-02-06
==================
 * fix: add back mistakenly removed databaseName parameter #66 #64 [ramicohen303](https://github.com/ramicohen303)

2.1.0 / 2019-02-05
==================
 * feat: add store.all #65 [itsinprog](https://github.com/itsinprog)

2.0.8 / 2019-02-03
==================
 * fix: use archetype to cast options

2.0.7 / 2019-01-23
==================
 * docs: replace assert with console.log() to make example copy/pastable #63 [Roeefl](https://github.com/Roeefl)

2.0.6 / 2018-12-04
==================
 * fix: use `deleteOne()` and `deleteMany()` instead of deprecated `remove()` #60 #59 [ramicohen303](https://github.com/ramicohen303)

2.0.5 / 2018-11-17
==================
 * fix: use `updateOne()` instead of deprecated `update()` #58 #57 [johannordin](https://github.com/johannordin)

2.0.4 / 2018-11-12
==================
 * fix: upgrade mongodb driver -> 3.1.8 and set `useNewUrlParser` by default #55 [ddtraceweb](https://github.com/ddtraceweb)

2.0.3 / 2018-06-06
==================
 * fix: expose store.client property so you can disconnect properly #52

2.0.2 / 2018-03-27
==================
 * fix: use client.db() syntax to support getting db name from URI with replica set #50

2.0.1 / 2018-03-13
==================
 * fix: pull databaseName from URI by default for backwards compat #51 #50
