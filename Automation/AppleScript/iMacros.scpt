FasdUAS 1.101.10   ��   ��    k             l      ��  ��   ic* )
do shell script "rm /Users/atlasgroup/imacros/downloads/fci-exchange.txt"
tell application "Firefox"
	( ** )
	display dialog "This is just a test." buttons {"Great", "OK"} �
		default button "OK" giving up after 3
	References:
	http://wiki.imacros.net/Bookmarklet - iMacros Bookmarklet (in FF)
	http://stackoverflow.com/q/16845559/1640892 - Applescript calls iMacros from FF bookmark
	http://stackoverflow.com/q/3154535/1640892 - Applescript run terminal commands
	http://stackoverflow.com/a/6409028/1640892 - cURL POST data from local file
	http://stackoverflow.com/a/36170990/1640892 - Gets full path of local file
	http://stackoverflow.com/a/36175304/1640892 - iMacros Http POST to API via jQuery
	http://apple.stackexchange.com/a/24863/156286 - Use Cron to schedule Applescripts
	open location "http://internalwebpage.com"
	open location "imacros://run/?m=ts-pheonix.iim"
	delay 10
	cron: http://apple.stackexchange.com/a/24863/156286
	( ** )
	open location "imacros://run/?m=fci-exchange.iim"
	( ** )
end tell
( ** )
curl -i -X POST https://script.google.com/macros/s/AKfycbzDwc66sUiYeNX2AZvVEoHDPAgnKV4LGaaRO-vVeOPOK7yA9bU/exec --data-binary "@/Users/atlasgroup/imacros/downloads/fci-exchange.txt"
( ** )
do shell script "curl -d data=@~/iMacros/Downloads/fci-exchange https://script.google.com/macros/s/AKfycbzDwc66sUiYeNX2AZvVEoHDPAgnKV4LGaaRO-vVeOPOK7yA9bU/exec"
( *     � 	 	
� *   ) 
 d o   s h e l l   s c r i p t   " r m   / U s e r s / a t l a s g r o u p / i m a c r o s / d o w n l o a d s / f c i - e x c h a n g e . t x t " 
 t e l l   a p p l i c a t i o n   " F i r e f o x " 
 	 (   * *   ) 
 	 d i s p l a y   d i a l o g   " T h i s   i s   j u s t   a   t e s t . "   b u t t o n s   { " G r e a t " ,   " O K " }   � 
 	 	 d e f a u l t   b u t t o n   " O K "   g i v i n g   u p   a f t e r   3 
 	 R e f e r e n c e s : 
 	 h t t p : / / w i k i . i m a c r o s . n e t / B o o k m a r k l e t   -   i M a c r o s   B o o k m a r k l e t   ( i n   F F ) 
 	 h t t p : / / s t a c k o v e r f l o w . c o m / q / 1 6 8 4 5 5 5 9 / 1 6 4 0 8 9 2   -   A p p l e s c r i p t   c a l l s   i M a c r o s   f r o m   F F   b o o k m a r k 
 	 h t t p : / / s t a c k o v e r f l o w . c o m / q / 3 1 5 4 5 3 5 / 1 6 4 0 8 9 2   -   A p p l e s c r i p t   r u n   t e r m i n a l   c o m m a n d s 
 	 h t t p : / / s t a c k o v e r f l o w . c o m / a / 6 4 0 9 0 2 8 / 1 6 4 0 8 9 2   -   c U R L   P O S T   d a t a   f r o m   l o c a l   f i l e 
 	 h t t p : / / s t a c k o v e r f l o w . c o m / a / 3 6 1 7 0 9 9 0 / 1 6 4 0 8 9 2   -   G e t s   f u l l   p a t h   o f   l o c a l   f i l e 
 	 h t t p : / / s t a c k o v e r f l o w . c o m / a / 3 6 1 7 5 3 0 4 / 1 6 4 0 8 9 2   -   i M a c r o s   H t t p   P O S T   t o   A P I   v i a   j Q u e r y 
 	 h t t p : / / a p p l e . s t a c k e x c h a n g e . c o m / a / 2 4 8 6 3 / 1 5 6 2 8 6   -   U s e   C r o n   t o   s c h e d u l e   A p p l e s c r i p t s 
 	 o p e n   l o c a t i o n   " h t t p : / / i n t e r n a l w e b p a g e . c o m " 
 	 o p e n   l o c a t i o n   " i m a c r o s : / / r u n / ? m = t s - p h e o n i x . i i m " 
 	 d e l a y   1 0 
 	 c r o n :   h t t p : / / a p p l e . s t a c k e x c h a n g e . c o m / a / 2 4 8 6 3 / 1 5 6 2 8 6 
 	 (   * *   ) 
 	 o p e n   l o c a t i o n   " i m a c r o s : / / r u n / ? m = f c i - e x c h a n g e . i i m " 
 	 (   * *   ) 
 e n d   t e l l 
 (   * *   ) 
 c u r l   - i   - X   P O S T   h t t p s : / / s c r i p t . g o o g l e . c o m / m a c r o s / s / A K f y c b z D w c 6 6 s U i Y e N X 2 A Z v V E o H D P A g n K V 4 L G a a R O - v V e O P O K 7 y A 9 b U / e x e c   - - d a t a - b i n a r y   " @ / U s e r s / a t l a s g r o u p / i m a c r o s / d o w n l o a d s / f c i - e x c h a n g e . t x t " 
 (   * *   ) 
 d o   s h e l l   s c r i p t   " c u r l   - d   d a t a = @ ~ / i M a c r o s / D o w n l o a d s / f c i - e x c h a n g e   h t t p s : / / s c r i p t . g o o g l e . c o m / m a c r o s / s / A K f y c b z D w c 6 6 s U i Y e N X 2 A Z v V E o H D P A g n K V 4 L G a a R O - v V e O P O K 7 y A 9 b U / e x e c " 
 (   *   
�� 
 l     ����  I    �� ��
�� .sysoexecTEXT���     TEXT  m        �  f c u r l   - i   - X   P O S T   h t t p s : / / s c r i p t . g o o g l e . c o m / m a c r o s / s / A K f y c b z D w c 6 6 s U i Y e N X 2 A Z v V E o H D P A g n K V 4 L G a a R O - v V e O P O K 7 y A 9 b U / e x e c   - - d a t a - b i n a r y   @ / U s e r s / a t l a s g r o u p / i m a c r o s / d o w n l o a d s / f c i - e x c h a n g e . t x t��  ��  ��  ��       ��  ��    ��
�� .aevtoappnull  �   � ****  �� ����  ��
�� .aevtoappnull  �   � ****  k         
����  ��  ��        ��
�� .sysoexecTEXT���     TEXT�� �j ascr  ��ޭ