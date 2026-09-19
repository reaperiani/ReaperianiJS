// Copyright (C) 2004 and on, Cockos Inc.
// Modificato da reaperiani, 2022-2026.
// SPDX-License-Identifier: GPL-3.0-or-later

desc:Tinder EQ
tags:equalizer stereo complementary

slider1:100<0,100,0.05>Frequenza
slider2:0<-12,12,1>Gain (dB)
slider3:0.7<0.01,5,0.05>Larghezza
slider4:5<0,5,1{1,2,3,4,5,6}>Gruppo
slider5:0<0,1,1{maschio,femmina}>Ruolo

in_pin:Ingresso sinistro
in_pin:Ingresso destro
out_pin:Uscita sinistra
out_pin:Uscita destra

@init
c0=c1=c2=0;
ldelay1=ldelay2=rdelay1=rdelay2=0;
li1=li2=ri1=ri2=0;

// Controlla che la larghezza non sia zero e, nel caso, usa il default 0.7.
_global.tinderata.width == 0 ? _global.tinderata.width=0.7; 
_global.tinderata.width1 == 0 ? _global.tinderata.width1=0.7; 
_global.tinderata.width2 == 0 ? _global.tinderata.width2=0.7; 
_global.tinderata.width3 == 0 ? _global.tinderata.width3=0.7; 
_global.tinderata.width4 == 0 ? _global.tinderata.width4=0.7; 
_global.tinderata.width5 == 0 ? _global.tinderata.width5=0.7; 


@slider
// Conversione del cursore in frequenza.
frequenzasx = 16+slider1*1.20103;
frequenzahz = floor(exp(frequenzasx*log(1.059))*8.17742);


arc=frequenzahz*$pi/(srate*0.5);
gain=(2 ^ (slider2/6));
a=(sin(arc)*slider3) * (gain < 1 ? 1 : 0.25);
tmp=1/(1+a);


c0=tmp*a*(gain-1);
c1=tmp*2*cos(arc);
c2=tmp*(a-1);


// Salva i valori solo se non è appena cambiato il gruppo.

slider4 == memoria ? ( 

// Copia nelle variabili globali condivise.
slider4==0 ? _global.tinderata.freq=slider1;
slider4==0 ? _global.tinderata.width=slider3;
slider4==1 ? _global.tinderata.freq1=slider1;
slider4==1 ? _global.tinderata.width1=slider3;
slider4==2 ? _global.tinderata.freq2=slider1;
slider4==2 ? _global.tinderata.width2=slider3;
slider4==3 ? _global.tinderata.freq3=slider1;
slider4==3 ? _global.tinderata.width3=slider3;
slider4==4 ? _global.tinderata.freq4=slider1;
slider4==4 ? _global.tinderata.width4=slider3;
slider4==5 ? _global.tinderata.freq5=slider1;
slider4==5 ? _global.tinderata.width5=slider3;



// Copia il gain con segno normale o invertito in base al ruolo.
slider4==0 ? slider5==0 ? _global.tinderata.gain=slider2;
slider4==0 ? slider5==1 ? _global.tinderata.gain=-slider2;
slider4==1 ? slider5==0 ? _global.tinderata.gain1=slider2;
slider4==1 ? slider5==1 ? _global.tinderata.gain1=-slider2;
slider4==2 ? slider5==0 ? _global.tinderata.gain2=slider2;
slider4==2 ? slider5==1 ? _global.tinderata.gain2=-slider2;
slider4==3 ? slider5==0 ? _global.tinderata.gain3=slider2;
slider4==3 ? slider5==1 ? _global.tinderata.gain3=-slider2;
slider4==4 ? slider5==0 ? _global.tinderata.gain4=slider2;
slider4==4 ? slider5==1 ? _global.tinderata.gain4=-slider2;
slider4==5 ? slider5==0 ? _global.tinderata.gain5=slider2;
slider4==5 ? slider5==1 ? _global.tinderata.gain5=-slider2;

);

memoria=slider4;

@sample


// Legge le variabili globali condivise.
slider4==0 ? slider1=_global.tinderata.freq;
slider4==0 ? slider3=_global.tinderata.width;
slider4==1 ? slider1=_global.tinderata.freq1;
slider4==1 ? slider3=_global.tinderata.width1;
slider4==2 ? slider1=_global.tinderata.freq2;
slider4==2 ? slider3=_global.tinderata.width2;
slider4==3 ? slider1=_global.tinderata.freq3;
slider4==3 ? slider3=_global.tinderata.width3;
slider4==4 ? slider1=_global.tinderata.freq4;
slider4==4 ? slider3=_global.tinderata.width4;
slider4==5 ? slider1=_global.tinderata.freq5;
slider4==5 ? slider3=_global.tinderata.width5;

// Legge il gain con segno normale o invertito in base al ruolo.
slider4==0 ? slider5==0 ? slider2=_global.tinderata.gain;
slider4==0 ? slider5==1 ? slider2=-_global.tinderata.gain;
slider4==1 ? slider5==0 ? slider2=_global.tinderata.gain1;
slider4==1 ? slider5==1 ? slider2=-_global.tinderata.gain1;
slider4==2 ? slider5==0 ? slider2=_global.tinderata.gain2;
slider4==2 ? slider5==1 ? slider2=-_global.tinderata.gain2;
slider4==3 ? slider5==0 ? slider2=_global.tinderata.gain3;
slider4==3 ? slider5==1 ? slider2=-_global.tinderata.gain3;
slider4==4 ? slider5==0 ? slider2=_global.tinderata.gain4;
slider4==4 ? slider5==1 ? slider2=-_global.tinderata.gain4;
slider4==5 ? slider5==0 ? slider2=_global.tinderata.gain5;
slider4==5 ? slider5==1 ? slider2=-_global.tinderata.gain5;

// Conversione del cursore in frequenza.
frequenzasx = 16+slider1*1.20103;
frequenzahz = floor(exp(frequenzasx*log(1.059))*8.17742);

arc=frequenzahz*$pi/(srate*0.5);
gain=(2 ^ (slider2/6));
a=(sin(arc)*slider3) * (gain < 1 ? 1 : 0.25);
tmp=1/(1+a);


c0=tmp*a*(gain-1);
c1=tmp*2*cos(arc);
c2=tmp*(a-1);





tmp=c0*(spl0-ldelay2) + c1*li1 + c2*li2;
ldelay2=ldelay1; ldelay1=spl0; 
li2=li1; spl0 += (li1=tmp);

tmp=c0*(spl1-rdelay2) + c1*ri1 + c2*ri2;
rdelay2=rdelay1; rdelay1=spl1; 
ri2=ri1; spl1 += (ri1=tmp);
