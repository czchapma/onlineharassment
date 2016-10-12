import gulp from 'gulp';
import loadPlugins from 'gulp-load-plugins';
import webpack from 'webpack';
import rimraf from 'rimraf';

const plugins = loadPlugins();

import popupWebpackConfig from './popup/webpack.config';
import eventWebpackConfig from './event/webpack.config';
import optionsWebpackConfig from './options/webpack.config';
import contentWebpackConfig from './content/webpack.config';

gulp.task('popup-js', ['clean'], (cb) => {
  webpack(popupWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('event-js', ['clean'], (cb) => {
  webpack(eventWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('options-js', ['clean'], (cb) => {
  webpack(optionsWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('content-js', ['clean'], (cb) => {
  webpack(contentWebpackConfig, (err, stats) => {
    if(err) throw new plugins.util.PluginError('webpack', err);

    plugins.util.log('[webpack]', stats.toString());

    cb();
  });
});

gulp.task('popup-html', ['clean'], () => {
  return gulp.src('popup/source/index.html')
    .pipe(plugins.rename('popup.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('options-html', ['clean'], () => {
  return gulp.src('options/source/index.html')
    .pipe(plugins.rename('options.html'))
    .pipe(gulp.dest('./build'))
});

gulp.task('popup-css', ['clean'], () => {
  return gulp.src('popup/source/style.css')
    .pipe(plugins.rename('popup.css'))
    .pipe(gulp.dest('./build'))
});

gulp.task('toggleswitch-css', ['clean'], () => {
  return gulp.src('node_modules/react-toggle-switch/dist/css/switch.min.css')
    .pipe(plugins.rename('toggleswitch.css'))
    .pipe(gulp.dest('./build'))
});

gulp.task('copy-manifest', ['clean'], () => {
  return gulp.src('manifest.json')
    .pipe(gulp.dest('./build'));
});

gulp.task('copy-icon', ['clean'], () => {
  return gulp.src('icon.png')
    .pipe(gulp.dest('./build'));
});

gulp.task('clean', (cb) => {
  rimraf('./build', cb);
});

gulp.task('build', ['copy-manifest', 'popup-js', 'event-js', 'options-js', 'content-js', 'popup-html', 'options-html', 'popup-css', 'toggleswitch-css', 'copy-icon']);

gulp.task('watch', ['default'], () => {
  gulp.watch('popup/**/*', ['build']);
  gulp.watch('content/**/*', ['build']);
  gulp.watch('event/**/*', ['build']);
  gulp.watch('options/**/*', ['build']);
});

gulp.task('default', ['build']);
