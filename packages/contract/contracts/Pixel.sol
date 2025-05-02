// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract Pixel is ERC721URIStorage, Ownable {
    
    using Strings for uint256;

    uint256 public nextTokenId;

    struct ColorPair {
        string color1;
        string color2;
    }

    mapping(uint256 => ColorPair) public tokenColors;

    constructor(address initialOwner) ERC721("Pixel", "PXL") Ownable(initialOwner) {}

    // ✅ tokenURI 입력 없이 to만 받음
    function mint(address to) external {
        uint256 tokenId = nextTokenId++;
        _safeMint(to, tokenId);
        // ✅ _setTokenURI 불필요, tokenURI는 자동 생성됨

        // 기본 색상 지정
        tokenColors[tokenId] = ColorPair("#ff0000", "#0000ff"); // red, blue
    }

    function changeColor(uint256 tokenId, string memory color1, string memory color2) external {
        require(ownerOf(tokenId) == msg.sender, "Not token owner");
        require(_isValidHex(color1) && _isValidHex(color2), "Invalid hex color");
        tokenColors[tokenId] = ColorPair(color1, color2);
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(ownerOf(tokenId) != address(0), "Nonexistent token");

        ColorPair memory colors = tokenColors[tokenId];

        string memory svg = string(
            abi.encodePacked(
                '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">',
                '<rect width="50" height="50" fill="', colors.color1 ,'"/>',
                '<rect x="50" y="50" width="50" height="50" fill="', colors.color2 ,'"/>',
                '</svg>'
            )
        );

        string memory base64Svg = Base64.encode(bytes(svg));

        string memory json = string(
            abi.encodePacked(
                '{"name": "Pixel #',
                tokenId.toString(),
                '", "description": "A pixel art NFT", "image": "data:image/svg+xml;base64,',
                base64Svg,
                '"}'
            )
        );

        return string(
            abi.encodePacked(
                "data:application/json;base64,",
                Base64.encode(bytes(json))
            )
        );
    }

    // 내부 hex 유효성 체크 (6자리 # 제외 16진수)
    function _isValidHex(string memory hexColor) internal pure returns (bool) {
        bytes memory b = bytes(hexColor);
        if (b.length != 7 || b[0] != '#') return false;
        for (uint i = 1; i < 7; i++) {
            bytes1 char = b[i];
            if (
                !(char >= '0' && char <= '9') &&
                !(char >= 'a' && char <= 'f') &&
                !(char >= 'A' && char <= 'F')
            ) {
                return false;
            }
        }
        return true;
    }
}
