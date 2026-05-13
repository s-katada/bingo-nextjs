{
  description = "Bingo web app development environment";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = import nixpkgs { inherit system; };

        nodeVersion = "26.1.0";
        nodeSources = {
          "aarch64-darwin" = {
            arch = "darwin-arm64";
            sha256 = "c4b028b1ab7c01e4a526524d732522f71b0ea08e8859e29514d535ce2e17d443";
          };
          "x86_64-darwin" = {
            arch = "darwin-x64";
            sha256 = "6cbc3e8f528abaceca02d65e9f7df787ee7a49c245708d5bca6bc9c7c3cbf71f";
          };
          "aarch64-linux" = {
            arch = "linux-arm64";
            sha256 = "058f00fe6c84f804b4b96aab377f76ed57dd0be5f10af4dcc0fded172746f366";
          };
          "x86_64-linux" = {
            arch = "linux-x64";
            sha256 = "9fc6f21b6c4a62439727123e510e9c39febb2f563738f4927cd3e0b288c9b3c9";
          };
        };

        nodeSrc = nodeSources.${system};

        nodejs_26 = pkgs.stdenv.mkDerivation {
          pname = "nodejs";
          version = nodeVersion;

          src = pkgs.fetchurl {
            url = "https://nodejs.org/dist/v${nodeVersion}/node-v${nodeVersion}-${nodeSrc.arch}.tar.xz";
            sha256 = nodeSrc.sha256;
          };

          nativeBuildInputs = pkgs.lib.optionals pkgs.stdenv.isLinux [
            pkgs.autoPatchelfHook
          ];

          buildInputs = pkgs.lib.optionals pkgs.stdenv.isLinux [
            pkgs.stdenv.cc.cc.lib
            pkgs.zlib
          ];

          dontBuild = true;
          dontConfigure = true;

          installPhase = ''
            runHook preInstall
            mkdir -p $out
            cp -r . $out/
            runHook postInstall
          '';

          meta = with pkgs.lib; {
            description = "Node.js ${nodeVersion} (prebuilt from nodejs.org)";
            homepage = "https://nodejs.org";
            license = licenses.mit;
            platforms = builtins.attrNames nodeSources;
          };
        };
      in
      {
        devShells.default = pkgs.mkShell {
          packages = [
            nodejs_26
            pkgs.pnpm
            pkgs.typescript
            pkgs.typescript-language-server
            pkgs.git
          ];

          shellHook = ''
            echo "bingo dev shell"
            echo "  node    $(node --version)"
            echo "  pnpm    $(pnpm --version)"
          '';
        };
      });
}
