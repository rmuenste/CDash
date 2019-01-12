var CDash = angular
.module('CDash', [
    'angular-clipboard',
    'ngAnimate',
    'ngFileUpload',
    'ui.sortable',
    'ui.bootstrap',
    'googlechart'
    ]).value('googleChartApiConfig', {
    version: '1',
    optionalSettings: {
      packages: ['corechart'],
      language: 'ja'
    }
  });
