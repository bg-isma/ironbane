angular
    .module('server.services.zones', [
        'models'
    ])
    .run([
        'ZonesCollection',
        function(ZonesCollection) {
            'use strict';

            var path = Meteor.npmRequire('path');
            var walk = Meteor.npmRequire('walkdir');

            var meteorBuildPath = path.resolve('.') + '/';
            var meteorBuildPublicPath = meteorBuildPath + '../web.browser/app/';
            var scenePath = meteorBuildPublicPath + 'scene';

            // clear out available zones before reload
            ZonesCollection.remove({});

            walk(scenePath, {
                'no_recurse': true,
            }, Meteor.bindEnvironment(function(filePath) {
                var sceneId = path.basename(filePath);
                // add to zones TODO: perhaps load some zone metadata from ib_world?
                ZonesCollection.insert({
                    name: sceneId
                });
            }));
        }
    ]);