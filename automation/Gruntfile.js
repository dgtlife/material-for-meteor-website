/**
 * @file Configure the Grunt task runner for this project
 * @author Derek Gransaull <derek@dgtlife.com>
 * @copyright DGTLife, LLC 2016
 * Created on 10/31/16
 */

module.exports = function initGrunt(grunt) {
  grunt.initConfig({
    // Sync the files in this app with those in the relevant 'run' directory.
    rsync: {
      options: {
        args: ['--quiet'],
        exclude: [
          '.DS_Store',
          '.git*',
          '.idea',
          'automation',
          'tests'
        ],
        recursive: true
      },
      projectFiles: {
        options: {
          src: '../',
          dest: '/home/devops/DevLab/run/material-for-meteor',
          host: 'devops@hydra'
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
          '.meteor/packages',
          '!**/.DS_Store',
          '!**/.git/**',
          '!.idea/**',
          '!automation/**',
          '!**/node_modules/**'
        ],
        tasks: 'rsync:projectFiles',
        options: {
          cwd: '../',
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
  grunt.registerTask('watchAll', 'watch:allFiles');
};
