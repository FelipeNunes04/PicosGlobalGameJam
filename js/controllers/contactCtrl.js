app.controller("contatoCtrl",
 function($scope, $http){
	$scope.enviaEmail = function () {
		nome = $scope.contato.nome;
		email = $scope.contato.email;
		assunto = $scope.contato.assunto;
		mensagem = $scope.contato.mensagem;

		$http({
          url: 'sendemail.php',
          method: 'POST',
          data: {
            'nome': nome,
            'email': email,
            'assunto': assunto,
            'mensagem':mensagem,            
            
          },
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            
          }
          
	        }).
	        success(function (data) {
	            $scope.success = true;
	            

				$scope.contato.email = '';
				$scope.contato.nome = '';
				$scope.contato.assunto = '';
				$scope.contato.mensagem = '';

				$scope.formularioContato.$setPristine();
				
				alert("Obrigado pela mensagem, entraremos em contato o mais breve possível.");
	            
	        }).
	        error(function (data) {
	            $scope.error = true;
	            
	        });

	};
});
