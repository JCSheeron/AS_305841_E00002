. a s s e m b l y   e x t e r n   m s c o r l i b   { }  
 . a s s e m b l y   e x t e r n   _ _ F i e l d A t t r i b u t e   { }  
 . a s s e m b l y   e x t e r n   ' M a i n '   { }  
 . a s s e m b l y   e x t e r n   ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t '   { }  
 . a s s e m b l y   e x t e r n   ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e '   { }  
 . a s s e m b l y   e x t e r n   ' A C T F '   { }  
 . a s s e m b l y   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R '   { }  
 . m o d u l e   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' . d l l  
  
 . c l a s s   p u b l i c   a u t o   a n s i   b e f o r e f i e l d i n i t   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R '   e x t e n d s   [ m s c o r l i b ] S y s t e m . O b j e c t  
 {  
 . m e t h o d   p u b l i c   h i d e b y s i g   s p e c i a l n a m e   r t s p e c i a l n a m e  
         i n s t a n c e   v o i d     . c t o r ( )   c i l   m a n a g e d  
 {  
 . m a x s t a c k     8  
  
 l d c . i 4 . 0  
 s t s f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ B O O L _ 0 '  
 l d c . i 4 . 0  
 s t s f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ S A F E B O O L _ 0 '  
 l d c . i 4   1  
 s t s f l d   u n s i g n e d   i n t 8   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ S A F E B Y T E _ 1 '  
 l d c . i 4   9  
 s t s f l d   u n s i g n e d   i n t 8   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ S A F E B Y T E _ 9 '  
 l d c . i 4   0  
 s t s f l d   i n t 3 2   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ S A F E D I N T _ 0 '  
 l d c . i 4   - 1  
 s t s f l d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ S A F E I N T _ - 1 '  
 l d c . i 4   0  
 s t s f l d   u n s i g n e d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ W O R D _ 0 '  
 r e t  
 }  
  
  
 / /   l o c a l   v a r i a b l e s  
 . f i e l d   p u b l i c   b o o l   ' A c t i v a t e '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 2   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   i n t 1 6   ' S _ A x i s I D '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 2   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   b o o l   ' R e a d y '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 3   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   i n t 3 2   ' S _ S p e e d _ 4 B y t e '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 3   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   b o o l   ' S _ S t a t u s _ E n c S t a t u s '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 3   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   b o o l   ' E r r o r '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 3   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   u n s i g n e d   i n t 1 6   ' D i a g C o d e '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   1 3   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   b o o l   ' r e a d y 4 B y t e '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 9   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   b o o l   ' e r r o r 4 B y t e '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 9   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   u n s i g n e d   i n t 1 6   ' d i a g 4 B y t e '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 9   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   b o o l   ' r e a d y B a s i c '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 9   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   b o o l   ' E r r o r B a s i c '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 9   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   u n s i g n e d   i n t 1 6   ' d i a g B a s i c '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 9   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   b o o l   ' s e t D i a g 4 B y t e '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 9   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
  
 / /   F B   i n s t a n c e s  
 . f i e l d   p u b l i c   c l a s s   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t '   ' S F _ o S _ P R O F I L E _ B a s i c O n l y S _ 1 '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 F   0 0   0 0   0 0   F 4   0 1   0 0   0 0   C 6   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   c l a s s   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e '   ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e _ 1 '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 F   0 0   0 0   0 0   F 4   0 1   0 0   0 0   C 2   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
  
 . f i e l d   p u b l i c   s t a t i c   b o o l   ' _ _ C O N S T _ B O O L _ 0 '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 A   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   s t a t i c   b o o l   ' _ _ C O N S T _ S A F E B O O L _ 0 '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 A   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   s t a t i c   u n s i g n e d   i n t 8   ' _ _ C O N S T _ S A F E B Y T E _ 1 '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 A   0 0   0 0   0 0   0 1   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   s t a t i c   u n s i g n e d   i n t 8   ' _ _ C O N S T _ S A F E B Y T E _ 9 '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 A   0 0   0 0   0 0   0 9   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   s t a t i c   i n t 3 2   ' _ _ C O N S T _ S A F E D I N T _ 0 '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 A   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   s t a t i c   i n t 1 6   ' _ _ C O N S T _ S A F E I N T _ - 1 '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 A   0 0   0 0   0 0   F F   F F   F F   F F   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
 . f i e l d   p u b l i c   s t a t i c   u n s i g n e d   i n t 1 6   ' _ _ C O N S T _ W O R D _ 0 '  
 . c u s t o m   i n s t a n c e   v o i d   [ _ _ F i e l d A t t r i b u t e ] _ _ F i e l d A t t r i b u t e : : . c t o r ( v a l u e t y p e   [ _ _ F i e l d A t t r i b u t e ] F i e l d T y p e ,   i n t 3 2 ,   i n t 3 2 ,   i n t 3 2 ,   b o o l )   =   (   0 1   0 0   0 A   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   0 0   )  
  
 . m e t h o d   p u b l i c   h i d e b y s i g   i n s t a n c e   v o i d   _ _ c o l d s t a r t ( )   c i l   m a n a g e d  
 {  
 . m a x s t a c k     8  
  
 l d a r g . 0  
 l d s f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ B O O L _ 0 '  
 s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' A c t i v a t e '  
 l d a r g . 0  
 l d s f l d   u n s i g n e d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ W O R D _ 0 '  
 s t f l d   u n s i g n e d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' d i a g 4 B y t e '  
 l d a r g . 0  
 l d s f l d   u n s i g n e d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ W O R D _ 0 '  
 s t f l d   u n s i g n e d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' d i a g B a s i c '  
 l d a r g . 0  
 l d s f l d   u n s i g n e d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ W O R D _ 0 '  
 s t f l d   u n s i g n e d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' D i a g C o d e '  
 l d a r g . 0  
 l d s f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ B O O L _ 0 '  
 s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' E r r o r '  
 l d a r g . 0  
 l d s f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ B O O L _ 0 '  
 s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' e r r o r 4 B y t e '  
 l d a r g . 0  
 l d s f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ B O O L _ 0 '  
 s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' E r r o r B a s i c '  
 l d a r g . 0  
 l d s f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ B O O L _ 0 '  
 s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' R e a d y '  
 l d a r g . 0  
 l d s f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ B O O L _ 0 '  
 s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' r e a d y 4 B y t e '  
 l d a r g . 0  
 l d s f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ B O O L _ 0 '  
 s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' r e a d y B a s i c '  
 l d a r g . 0  
 l d s f l d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ S A F E I N T _ - 1 '  
 s t f l d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S _ A x i s I D '  
 l d a r g . 0  
 l d s f l d   i n t 3 2   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ S A F E D I N T _ 0 '  
 s t f l d   i n t 3 2   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S _ S p e e d _ 4 B y t e '  
 l d a r g . 0  
 l d s f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ S A F E B O O L _ 0 '  
 s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S _ S t a t u s _ E n c S t a t u s '  
 l d a r g . 0  
 l d s f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ B O O L _ 0 '  
 s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' s e t D i a g 4 B y t e '  
 l d a r g . 0  
 l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ B a s i c O n l y S _ 1 '  
 c a l l   i n s t a n c e   v o i d   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' : : _ _ c o l d s t a r t ( )  
 l d a r g . 0  
 l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e _ 1 '  
 c a l l   i n s t a n c e   v o i d   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' : : _ _ c o l d s t a r t ( )  
 r e t  
 }  
  
 . m e t h o d   p u b l i c   h i d e b y s i g   i n s t a n c e   v o i d   ' _ _ S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' ( )   c i l   m a n a g e d  
 {  
     . m a x s t a c k   2 0  
  
     / /   N E T W O R K   0  
     I L _ 0 0 0 0 _ 0 0 0 0 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 0 1 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e _ 1 '  
     I L _ 0 0 0 0 _ 0 0 0 2 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 0 3 :     l d f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' A c t i v a t e '  
     I L _ 0 0 0 0 _ 0 0 0 4 :     s t f l d   b o o l   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' : : ' A c t i v a t e '  
     I L _ 0 0 0 0 _ 0 0 0 5 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 0 6 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e _ 1 '  
     I L _ 0 0 0 0 _ 0 0 0 7 :     l d s f l d   u n s i g n e d   i n t 8   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ S A F E B Y T E _ 1 '  
     I L _ 0 0 0 0 _ 0 0 0 8 :     s t f l d   u n s i g n e d   i n t 8   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' : : ' S _ P r o f i l e I D '  
     I L _ 0 0 0 0 _ 0 0 0 9 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 1 0 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e _ 1 '  
     I L _ 0 0 0 0 _ 0 0 1 1 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 1 2 :     l d f l d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S _ A x i s I D '  
     I L _ 0 0 0 0 _ 0 0 1 3 :     s t f l d   i n t 1 6   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' : : ' S _ I n s t a n c e I D '  
     I L _ 0 0 0 0 _ 0 0 1 4 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 1 5 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e _ 1 '  
     I L _ 0 0 0 0 _ 0 0 1 6 :     l d s f l d   u n s i g n e d   i n t 8   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ S A F E B Y T E _ 9 '  
     I L _ 0 0 0 0 _ 0 0 1 7 :     s t f l d   u n s i g n e d   i n t 8   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' : : ' S _ F u n c t i o n S e t I D '  
     I L _ 0 0 0 0 _ 0 0 1 8 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 1 9 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e _ 1 '  
     I L _ 0 0 0 0 _ 0 0 2 0 :     c a l l   i n s t a n c e   v o i d   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' : : _ _ S F _ o S _ P R O F I L E _ I N _ 4 B y t e ( )  
     I L _ 0 0 0 0 _ 0 0 2 1 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 2 2 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 2 3 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e _ 1 '  
     I L _ 0 0 0 0 _ 0 0 2 4 :     l d f l d   b o o l   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' : : ' R e a d y '  
     I L _ 0 0 0 0 _ 0 0 2 5 :     s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' r e a d y 4 B y t e '  
     I L _ 0 0 0 0 _ 0 0 2 6 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 2 7 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 2 8 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e _ 1 '  
     I L _ 0 0 0 0 _ 0 0 2 9 :     l d f l d   i n t 3 2   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' : : ' S _ V e n d o r I N _ 4 B y t e '  
     I L _ 0 0 0 0 _ 0 0 3 0 :     s t f l d   i n t 3 2   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S _ S p e e d _ 4 B y t e '  
     I L _ 0 0 0 0 _ 0 0 3 1 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 3 2 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 3 3 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e _ 1 '  
     I L _ 0 0 0 0 _ 0 0 3 4 :     l d f l d   b o o l   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' : : ' E r r o r '  
     I L _ 0 0 0 0 _ 0 0 3 5 :     s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' e r r o r 4 B y t e '  
     I L _ 0 0 0 0 _ 0 0 3 6 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 3 7 :     l d a r g . 0  
     I L _ 0 0 0 0 _ 0 0 3 8 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e _ 1 '  
     I L _ 0 0 0 0 _ 0 0 3 9 :     l d f l d   u n s i g n e d   i n t 1 6   [ ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' ] ' S F _ o S _ P R O F I L E _ I N _ 4 B y t e ' : : ' D i a g C o d e '  
     I L _ 0 0 0 0 _ 0 0 4 0 :     s t f l d   u n s i g n e d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' d i a g 4 B y t e '  
  
     / /   N E T W O R K   1  
     I L _ 0 0 0 1 _ 0 0 0 0 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 0 1 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ B a s i c O n l y S _ 1 '  
     I L _ 0 0 0 1 _ 0 0 0 2 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 0 3 :     l d f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' A c t i v a t e '  
     I L _ 0 0 0 1 _ 0 0 0 4 :     s t f l d   b o o l   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' : : ' A c t i v a t e '  
     I L _ 0 0 0 1 _ 0 0 0 5 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 0 6 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ B a s i c O n l y S _ 1 '  
     I L _ 0 0 0 1 _ 0 0 0 7 :     l d s f l d   u n s i g n e d   i n t 8   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ S A F E B Y T E _ 1 '  
     I L _ 0 0 0 1 _ 0 0 0 8 :     s t f l d   u n s i g n e d   i n t 8   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' : : ' S _ P r o f i l e I D '  
     I L _ 0 0 0 1 _ 0 0 0 9 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 1 0 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ B a s i c O n l y S _ 1 '  
     I L _ 0 0 0 1 _ 0 0 1 1 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 1 2 :     l d f l d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S _ A x i s I D '  
     I L _ 0 0 0 1 _ 0 0 1 3 :     s t f l d   i n t 1 6   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' : : ' S _ I n s t a n c e I D '  
     I L _ 0 0 0 1 _ 0 0 1 4 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 1 5 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ B a s i c O n l y S _ 1 '  
     I L _ 0 0 0 1 _ 0 0 1 6 :     l d s f l d   u n s i g n e d   i n t 8   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' _ _ C O N S T _ S A F E B Y T E _ 1 '  
     I L _ 0 0 0 1 _ 0 0 1 7 :     s t f l d   u n s i g n e d   i n t 8   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' : : ' S _ S t a t u s I D '  
     I L _ 0 0 0 1 _ 0 0 1 8 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 1 9 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ B a s i c O n l y S _ 1 '  
     I L _ 0 0 0 1 _ 0 0 2 0 :     c a l l   i n s t a n c e   v o i d   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' : : _ _ S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ( )  
     I L _ 0 0 0 1 _ 0 0 2 1 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 2 2 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 2 3 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ B a s i c O n l y S _ 1 '  
     I L _ 0 0 0 1 _ 0 0 2 4 :     l d f l d   b o o l   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' : : ' R e a d y '  
     I L _ 0 0 0 1 _ 0 0 2 5 :     s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' r e a d y B a s i c '  
     I L _ 0 0 0 1 _ 0 0 2 6 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 2 7 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 2 8 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ B a s i c O n l y S _ 1 '  
     I L _ 0 0 0 1 _ 0 0 2 9 :     l d f l d   b o o l   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' : : ' S _ S t a t u s _ B i t 5 '  
     I L _ 0 0 0 1 _ 0 0 3 0 :     s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S _ S t a t u s _ E n c S t a t u s '  
     I L _ 0 0 0 1 _ 0 0 3 1 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 3 2 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 3 3 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ B a s i c O n l y S _ 1 '  
     I L _ 0 0 0 1 _ 0 0 3 4 :     l d f l d   b o o l   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' : : ' E r r o r '  
     I L _ 0 0 0 1 _ 0 0 3 5 :     s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' E r r o r B a s i c '  
     I L _ 0 0 0 1 _ 0 0 3 6 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 3 7 :     l d a r g . 0  
     I L _ 0 0 0 1 _ 0 0 3 8 :     l d f l d   c l a s s   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t '   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' S F _ o S _ P R O F I L E _ B a s i c O n l y S _ 1 '  
     I L _ 0 0 0 1 _ 0 0 3 9 :     l d f l d   u n s i g n e d   i n t 1 6   [ ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' ] ' S F _ o S _ P R O F I L E _ B a s i c O n l y S t a t ' : : ' D i a g C o d e '  
     I L _ 0 0 0 1 _ 0 0 4 0 :     s t f l d   u n s i g n e d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' d i a g B a s i c '  
  
     / /   N E T W O R K   2  
     I L _ 0 0 0 2 _ 0 0 0 0 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 0 1 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 0 2 :     l d f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' r e a d y B a s i c '  
     I L _ 0 0 0 2 _ 0 0 0 3 :     l d a r g . 0  
     I L _ 0 0 0 2 _ 0 0 0 4 :     l d f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' r e a d y 4 B y t e '  
     I L _ 0 0 0 2 _ 0 0 0 5 :     a n d  
     I L _ 0 0 0 2 _ 0 0 0 6 :     s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' R e a d y '  
  
     / /   N E T W O R K   3  
     I L _ 0 0 0 3 _ 0 0 0 0 :     l d a r g . 0  
     I L _ 0 0 0 3 _ 0 0 0 1 :     l d a r g . 0  
     I L _ 0 0 0 3 _ 0 0 0 2 :     l d f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' E r r o r B a s i c '  
     I L _ 0 0 0 3 _ 0 0 0 3 :     l d a r g . 0  
     I L _ 0 0 0 3 _ 0 0 0 4 :     l d f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' e r r o r 4 B y t e '  
     I L _ 0 0 0 3 _ 0 0 0 5 :     o r  
     I L _ 0 0 0 3 _ 0 0 0 6 :     s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' E r r o r '  
  
     / /   N E T W O R K   4  
     I L _ 0 0 0 4 _ 0 0 0 0 :     l d a r g . 0  
     I L _ 0 0 0 4 _ 0 0 0 1 :     l d a r g . 0  
     I L _ 0 0 0 4 _ 0 0 0 2 :     l d f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' e r r o r 4 B y t e '  
     I L _ 0 0 0 4 _ 0 0 0 3 :     l d a r g . 0  
     I L _ 0 0 0 4 _ 0 0 0 4 :     l d f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' E r r o r B a s i c '  
     I L _ 0 0 0 4 _ 0 0 0 5 :     n o t  
     I L _ 0 0 0 4 _ 0 0 0 6 :     a n d  
     I L _ 0 0 0 4 _ 0 0 0 7 :     s t f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' s e t D i a g 4 B y t e '  
  
     / /   N E T W O R K   5  
     I L _ 0 0 0 5 _ 0 0 0 0 :     l d a r g . 0  
     I L _ 0 0 0 5 _ 0 0 0 1 :     l d a r g . 0  
     I L _ 0 0 0 5 _ 0 0 0 2 :     l d f l d   b o o l   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' s e t D i a g 4 B y t e '  
     I L _ 0 0 0 5 _ 0 0 0 3 :     l d a r g . 0  
     I L _ 0 0 0 5 _ 0 0 0 4 :     l d f l d   u n s i g n e d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' d i a g 4 B y t e '  
     I L _ 0 0 0 5 _ 0 0 0 5 :     l d a r g . 0  
     I L _ 0 0 0 5 _ 0 0 0 6 :     l d f l d   u n s i g n e d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' d i a g B a s i c '  
     I L _ 0 0 0 5 _ 0 0 0 7 :     c a l l   u n s i g n e d   i n t 1 6   [ ' A C T F ' ] ' A C T F ' : : ' _ _ A C T F ' ( b o o l ,   u n s i g n e d   i n t 1 6 ,   u n s i g n e d   i n t 1 6 )  
     I L _ 0 0 0 5 _ 0 0 0 8 :     s t f l d   u n s i g n e d   i n t 1 6   ' S F _ o S _ M O T I O N _ D a t a _ S p e e d _ B R ' : : ' D i a g C o d e '  
  
     / /   N E T W O R K   6  
     I L _ 0 0 0 6 _ 0 0 0 0 :     r e t  
  
 }  
 }  
  
 