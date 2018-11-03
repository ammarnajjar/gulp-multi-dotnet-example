const gulp = require('gulp');
const dotnet = require('gulp-dotnet');

let buildTasks = [];
let runTasks = [];
const root = '.';

let services = ['ex-dotnet-1', 'ex-dotnet-2', 'ex-dotnet-3'];
services.forEach((service) => {
    gulp.task(`restore:${service}`, function (done) {
        server = new dotnet({ cwd: `${root}/${service}/` });
        server.start('restore', done);
        done();
    });
    gulp.task(`build:${service}`, gulp.series(`restore:${service}`, function (done) {
        dotnet.build({ cwd: `${root}/${service}/` }, done);
        done();
    }));
    gulp.task(`run:${service}`, gulp.series(`build:${service}`, function (done) {
        server = new dotnet({ cwd: `${root}/${service}/` });
        server.start('run', done);
        done();
    }));
    buildTasks.push(`build:${service}`);
    runTasks.push(`run:${service}`);
});
gulp.task('build:all', gulp.parallel(buildTasks));
gulp.task('run:all', gulp.parallel(runTasks));