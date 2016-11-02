/**
 * @file Configure the Grunt task runner for this project
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2016
 * Created on 10/31/16
 */

module.exports = function(grunt) {
  grunt.initConfig({
    // Sync the files in this app with those in the corresponding run directory.
    rsync: {
      options: {
        args: ['--quiet'],
        exclude: [
          '.DS_Store',
          '.git*',
          '.idea',
          '.meteor',
          'automation',
          'tests'],
        recursive: true
      },
      projectFiles: {
        options: {
          src: '../',
          dest: '/Volumes/DGTLabs/run/material-for-meteor'
        }
      },
      packagesFile: {
        options: {
          src: '../.meteor/packages',
          dest: '/Volumes/DGTLabs/run/material-for-meteor/.meteor/packages'
        }
      }
    },

    // Watch project files and trigger rsync:projectFiles on changes.
    watch: {
      allFiles: {
        files: [
          '**/*.jade',
          '**/*.html',
          '**/*.js',
          '**/*.coffee',
          '**/*.styl',
          '**/*.css',
          '**/*.svg',
          '**/*.json',
          '**/*.txt',
          '**/*.md',
          '!**/.DS_Store',
          '!../.git/**',
          '!../.idea/**',
          '!../.meteor/**',
          '!../automation/**',
          '!**/node_modules/**'
        ],
        tasks: 'rsync:projectFiles',
        options: {
          cwd: '/Users/Derek//DGTLife/WebDev/material-for-meteor',
          event: 'all'
        }
      }
    }
  });

  // Load the plugins.
  grunt.loadNpmTasks('grunt-rsync');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Define the tasks.
  grunt.registerTask('default', 'rsync:projectFiles');
  grunt.registerTask('project', 'rsync:projectFiles');
  grunt.registerTask('packages', 'rsync:packagesFile');
  grunt.registerTask('watchAll', 'watch:allFiles');

};
