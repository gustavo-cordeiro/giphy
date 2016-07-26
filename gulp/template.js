'use strict';

import fs from 'fs';
import path from 'path';
import foldero from 'foldero';
import jade from 'jade';
import wrap from 'gulp-wrap';
import yaml from 'js-yaml';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
  let dirs = config.directories;
  let dest = path.join(taskTarget);
  console.log(dest);
  let dataPath = path.join(dirs.source, dirs.data);

  // Jade template compile
  gulp.task('template', () => {
    let siteData = {};
    if (fs.existsSync(dataPath)) {
      // Convert directory to JS Object
      siteData = foldero(dataPath, {
        recurse: true,
        whitelist: '(.*/)*.+\.(json|ya?ml)$',
        loader: function loadAsString(file) {
          let json = {};
          try {
            if (path.extname(file).match(/^.ya?ml$/)) {
              json = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
            }
            else {
              json = JSON.parse(fs.readFileSync(file, 'utf8'));
            }
          }
          catch(e) {
            console.log('Error Parsing JSON/YAML file: ' + file);
            console.log('==== Details Below ====');
            console.log(e);
          }
          return json;
        }
      });
    }

    // Add --debug option to your gulp task to view
    // what data is being loaded into your templates
    if (args.debug) {
      console.log('==== DEBUG: site.data being injected to templates ====');
      console.log(siteData);
      console.log('\n==== DEBUG: package.json config being injected to templates ====');
      console.log(config);
    }

    return gulp.src([
      path.join(dirs.source+'/_views', '**/*.jade'),
    ])
    .pipe(plugins.changed('src/_scripts/views'))
    .pipe(plugins.plumber())
    .pipe(plugins.jade({
      jade: jade,
      pretty: true,
      client: true,
      locals: {
        config: config,
        debug: true,
        site: {
          data: siteData
        }
      }
    }))
    .pipe(wrap('import jade from "jade-runtime"; export default <%= contents %>', {}, { parse: false }))
    .pipe(gulp.dest('src/_scripts/views'))
    .on('end', browserSync.reload);
  });
}
