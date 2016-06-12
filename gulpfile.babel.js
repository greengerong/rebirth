import gulp from 'gulp';
import stubby from 'gulp-stubby-server';
import path from 'path';

gulp.task('mock', (cb) => {
    const options = {
        callback: (server, options) => {
            server.get(1, function (err, endpoint) {
                if (!err)
                    console.log(endpoint);
            });
        },
        stubs: 8000,
        tls: 8443,
        admin: 8010,
        relativeFilesPath: true,
        files: [
            path.join(__dirname, './mocks/**/*.{yaml,js}')
        ]
    };

    stubby(options, cb);
});

// gulp.task('default', ['mock']);