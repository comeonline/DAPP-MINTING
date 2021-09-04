# BullNFT
Bull NFT DAPP minting NFT


Bonjour, Voici une Dapp Minting NFT 

Matériel necessaire :

-NODE JS 
-Truffle 
-Ganache (pour test sur ETH server de test)
-Metamask
-Avoir un serveur qui va garder le JSON et PNG des nft 

Description du projet :

-Backend :
    c'est la genération des NFT ainsi que de leur fichir JSON 
-Contrat :
    Création du token 
-Frontend :
    Dapp Minting relation avec les métadata (fichir JSON des nft) et la BC 

Début :

Backend 

Lancer la commande : 
 Yarn add all
 Mettre dans index.js l'Url du server qui va garder les NFT

Il faut d'abord avoir les visuels necessaires pour lancer la génération automatique des nft. donc des PNG à rentrer dans des catégorie de Input 

Une fois les images placées pour générer des NFT il suffit de changer le nombre que l'on veut dans le code index.js ainsi que taper la commande  :
    node index.js   
Cela va generer des NFT dans le fichier OUTPUT ainsi que des NFT sous le format JSON le plus important.

Le dossier OUTPUT est à placer dans notre serveur à l'URL indiqué ci-dessus.

Contrat

Utilsiation de remix 

Frontend

yarn add all

Tout d'abord mettre notre code.sol dans le fichier SmartContract.sol 

Pour utiliser Truffle : 
Lancer d'abord, Ganache pour avoir une clé ainsi que des comptes deja crédités en ETH test pour les avoir il suffit d'utilisr Metémask et d'nentrer la clé donnée en haut du client de ganache.

Ensuite entré le RPC de test donnée dans Ganache pour donner une nouvelle BC sur Métamask
RPC : HTTP://127.0.0.1:7545
Chain ID 1337

Dans truflle Config .js 

    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 7545, // Standard Ethereum port (default: none) 
      network_id: "*", // Any network (default: none)

Ensuite pour tester 

truffle migrate --reset

Cela va tester notre contrat et crée les ABI dans contract du src 

Il suffit ensuite sauf erreur de lancer cette commande et vous allez avoir un localhost avec une application qui s'ouvre sur le web Voius devez vous connecter avec le métamask 

yarn start pour lancer le server 


Voila Merci

PERREVE Enzo