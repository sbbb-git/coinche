from PIL import Image, ImageDraw, ImageFont
import math, os

GREEN_TOP=(11,107,67); GREEN_BOT=(5,58,34); GOLD=(245,197,24)
WHITE=(250,250,249); BLACK=(20,22,29); RED=(200,40,55)

def vgrad(w,h,top,bot):
    img=Image.new("RGB",(w,h))
    px=img.load()
    for y in range(h):
        t=y/(h-1)
        px_row=tuple(int(top[i]+(bot[i]-top[i])*t) for i in range(3))
        for x in range(w): px[x,y]=px_row
    return img

def rounded_mask(w,h,r):
    m=Image.new("L",(w,h),0); d=ImageDraw.Draw(m)
    d.rounded_rectangle([0,0,w-1,h-1],radius=r,fill=255); return m

def heart(d,cx,cy,s,color):
    d.polygon([(cx,cy+s*0.95),(cx-s,cy-s*0.1),(cx+s,cy-s*0.1)],fill=color)
    d.ellipse([cx-s,cy-s*0.75,cx,cy+s*0.25],fill=color)
    d.ellipse([cx,cy-s*0.75,cx+s,cy+s*0.25],fill=color)

def spade(d,cx,cy,s,color):
    # corps = coeur inversé
    d.polygon([(cx,cy-s*0.95),(cx-s,cy+s*0.1),(cx+s,cy+s*0.1)],fill=color)
    d.ellipse([cx-s,cy-s*0.25,cx,cy+s*0.75],fill=color)
    d.ellipse([cx,cy-s*0.25,cx+s,cy+s*0.75],fill=color)
    # pied
    d.polygon([(cx,cy+s*0.2),(cx-s*0.45,cy+s),(cx+s*0.45,cy+s)],fill=color)

def card(base, cx, cy, w, h, angle, draw_suit):
    SS=4
    c=Image.new("RGBA",(w*SS,h*SS),(0,0,0,0)); d=ImageDraw.Draw(c)
    r=int(min(w,h)*SS*0.12)
    d.rounded_rectangle([0,0,w*SS-1,h*SS-1],radius=r,fill=WHITE+(255,))
    draw_suit(d, w*SS//2, h*SS//2, int(min(w,h)*SS*0.30))
    c=c.resize((w,h),Image.LANCZOS).rotate(angle,expand=True,resample=Image.BICUBIC)
    base.alpha_composite(c,(cx-c.width//2, cy-c.height//2))

def make_icon(size):
    SS=2; W=size*SS
    bg=vgrad(W,W,GREEN_TOP,GREEN_BOT).convert("RGBA")
    d=ImageDraw.Draw(bg)
    # deux cartes
    card(bg, int(W*0.42), int(W*0.54), int(W*0.40), int(W*0.55), 14, lambda dr,x,y,s: heart(dr,x,y,s,RED))
    card(bg, int(W*0.58), int(W*0.50), int(W*0.40), int(W*0.55), -10, lambda dr,x,y,s: spade(dr,x,y,s,BLACK))
    # masque arrondi
    m=rounded_mask(W,W,int(W*0.22))
    out=Image.new("RGBA",(W,W),(0,0,0,0)); out.paste(bg,(0,0),m)
    return out.resize((size,size),Image.LANCZOS)

os.makedirs("store-assets",exist_ok=True)
for sz,path in [(1024,"store-assets/icon-1024.png"),(512,"public/icon-512.png"),
                (192,"public/icon-192.png"),(180,"public/apple-touch-icon.png")]:
    make_icon(sz).save(path)
    print("écrit",path)

# Maskable 512 (zone de sécurité : icône plus petite, fond plein)
mask=Image.new("RGBA",(512,512),(0,0,0,0))
mbg=vgrad(512,512,GREEN_TOP,GREEN_BOT).convert("RGBA")
mask.paste(mbg,(0,0))
ic=make_icon(360); mask.alpha_composite(ic,(76,76))
mask.save("public/icon-512-maskable.png"); print("écrit public/icon-512-maskable.png")

# Bannière Google Play 1024x500
fg=vgrad(1024,500,GREEN_TOP,GREEN_BOT).convert("RGBA")
ic=make_icon(300); fg.alpha_composite(ic,(70,100))
d=ImageDraw.Draw(fg)
def font(sz):
    for p in ["/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf","/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"]:
        if os.path.exists(p): return ImageFont.truetype(p,sz)
    return ImageFont.load_default()
d.text((420,150),"Coincheur",font=font(96),fill=WHITE)
d.text((422,260),"Coinche & Belote contrée",font=font(40),fill=GOLD)
d.text((422,320),"Coach • Sans pub • Hors-ligne",font=font(34),fill=(220,230,225))
fg.convert("RGB").save("store-assets/feature-graphic-1024x500.png"); print("écrit store-assets/feature-graphic-1024x500.png")
print("OK")
