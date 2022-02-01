desc:FUORILAVOCE Mid Side Eq

slider1:gain_db=0<-150,12,1>-gain (dB)
slider2:100<0,100,0.05>Frequenza (Hz)
slider3:0<0,6,1>Forza (Db)

in_pin:left input
in_pin:right input
out_pin:left output
out_pin:right output

@init
last_gain=10^(gain_db/20);

//EQ1
c0=c1=c2=0;
ldelay1=ldelay2=rdelay1=rdelay2=0;
li1=li2=ri1=ri2=0;

//EQ2
_c0=_c1=_c2=0;
_ldelay1=_ldelay2=_rdelay1=_rdelay2=0;
_li1=_li2=_ri1=_ri2=0;

gainfra=slider3;
gainfra2=0-slider3;

@slider
next_gain=10^(gain_db/20);


gainfra=slider3;
gainfra2=0-slider3;

//CONVERSIONE DA FADER A HZ

frequenzasx = 16+slider2*1.20103;
frequenzahz = floor(exp(frequenzasx*log(1.059))*8.17742);


//SLIDER PER EQ 1

//Gain 3 e -3 con q 1 (nel calcolo di a moltiplicato dopo arc)
arc=frequenzahz*$pi/(srate*0.5);
gain=(2 ^ (gainfra/6));
a=(sin(arc)*1) * (gain < 1 ? 1 : 0.25);
tmp=1/(1+a);  

c0=tmp*a*(gain-1);
c1=tmp*2*cos(arc);
c2=tmp*(a-1);

//SLIDER PER EQ 2

_arc=frequenzahz*$pi/(srate*0.5);
_gain=(2 ^ (gainfra2/6));
_a=(sin(_arc)*1) * (_gain < 1 ? 1 : 0.25);
_tmp=1/(1+_a);  

_c0=_tmp*_a*(_gain-1);
_c1=_tmp*2*cos(_arc);
_c2=_tmp*(_a-1);


@block
d_gain = (next_gain - last_gain)/samplesblock;

@sample

//ENCODER MS
spl0orig=spl0;
spl1orig=spl1;
spl0 = (spl0orig+spl1orig) * 0.5;
spl1 = (spl0orig-spl1orig) * 0.5;



//EQ1

tmp=c0*(spl0-ldelay2) + c1*li1 + c2*li2;
ldelay2=ldelay1; ldelay1=spl0; 
li2=li1; spl0 += (li1=tmp);



//EQ2


_tmp=_c0*(spl1-_rdelay2) + _c1*_ri1 + _c2*_ri2;
_rdelay2=_rdelay1; _rdelay1=spl1; 
_ri2=_ri1; spl1 += (_ri1=_tmp);



//DECODER MS
tmp=spl0*1;
spl0 = (tmp + spl1) * 1;
spl1 = (tmp - spl1) * 1;

//GAIN FINALE
spl0 *= last_gain;
spl1 *= last_gain;
last_gain += d_gain;


@gfx 10 35
gfxfrase1 = "Frequenza";
gfx_x=gfx_y=5;
gfx_lineto(gfx_x, gfx_y,0);
gfx_r=gfx_b=0;
gfx_g=gfx_a=1;
gfx_drawstr(gfxfrase1);
gfx_drawchar($' ');
gfx_drawchar($'=');
gfx_drawchar($' ');
gfx_drawnumber(frequenzahz,0);
gfx_drawchar($' ');
gfx_drawchar($'H');
gfx_drawchar($'z');

