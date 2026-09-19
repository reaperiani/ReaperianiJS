// Copyright (C) 2004 and on, Cockos Inc.
// Modificato da reaperiani, 2022-2026.
// SPDX-License-Identifier: GPL-3.0-or-later

desc:MEGATinder EQ
tags:equalizer stereo complementary

slider1:100<0,100,0.05>Banda 1: frequenza
slider2:0<-12,12,1>Banda 1: gain (dB)
slider3:0.7<0.01,5,0.05>Banda 1: larghezza
slider4:5<0,5,1{1,2,3,4,5,6}>Gruppo

slider6:100<0,100,0.05>Banda 2: frequenza
slider7:0<-12,12,1>Banda 2: gain (dB)
slider8:0.7<0.01,5,0.05>Banda 2: larghezza

slider9:0<0,1,1{maschio,femmina}>Ruolo

// Lo slider 5 resta nascosto per non cambiare gli indici dei parametri storici.
slider5:0<0,1,1{maschio,femmina}>-Ruolo obsoleto

in_pin:Ingresso sinistro
in_pin:Ingresso destro
out_pin:Uscita sinistra
out_pin:Uscita destra

@init
// Banda 1.
c0=c1=c2=0;
ldelay1=ldelay2=rdelay1=rdelay2=0;
li1=li2=ri1=ri2=0;
// Banda 2.
c0A=c1A=c2A=0;
ldelay1A=ldelay2A=rdelay1A=rdelay2A=0;
li1A=li2A=ri1A=ri2A=0;



// Controlla che la larghezza non sia zero e, nel caso, usa il default 0.7.
_global.tinderata.width == 0 ? _global.tinderata.width=0.7; 
_global.tinderata.width1 == 0 ? _global.tinderata.width1=0.7; 
_global.tinderata.width2 == 0 ? _global.tinderata.width2=0.7; 
_global.tinderata.width3 == 0 ? _global.tinderata.width3=0.7; 
_global.tinderata.width4 == 0 ? _global.tinderata.width4=0.7; 
_global.tinderata.width5 == 0 ? _global.tinderata.width5=0.7; 


// Fa lo stesso per la seconda banda.
_global.tinderata.widthA == 0 ? _global.tinderata.widthA=0.7; 
_global.tinderata.width1A == 0 ? _global.tinderata.width1A=0.7; 
_global.tinderata.width2A == 0 ? _global.tinderata.width2A=0.7; 
_global.tinderata.width3A == 0 ? _global.tinderata.width3A=0.7; 
_global.tinderata.width4A == 0 ? _global.tinderata.width4A=0.7; 
_global.tinderata.width5A == 0 ? _global.tinderata.width5A=0.7; 





@slider
// Conversione del cursore della prima banda in frequenza.
frequenzasx = 16+slider1*1.20103;
frequenzahz = floor(exp(frequenzasx*log(1.059))*8.17742);


arc=frequenzahz*$pi/(srate*0.5);
gain=(2 ^ (slider2/6));
a=(sin(arc)*slider3) * (gain < 1 ? 1 : 0.25);
tmp=1/(1+a);


c0=tmp*a*(gain-1);
c1=tmp*2*cos(arc);
c2=tmp*(a-1);


// Stessa roba, ma per la seconda banda.

frequenzasxA = 16+slider6*1.20103;
frequenzahzA = floor(exp(frequenzasxA*log(1.059))*8.17742);


arcA=frequenzahzA*$pi/(srate*0.5);
gainA=(2 ^ (slider7/6));
aA=(sin(arcA)*slider8) * (gainA < 1 ? 1 : 0.25);
tmpA=1/(1+aA);


c0A=tmpA*aA*(gainA-1);
c1A=tmpA*2*cos(arcA);
c2A=tmpA*(aA-1);


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
// Seconda banda.
slider4==0 ? _global.tinderata.freqA=slider6;
slider4==0 ? _global.tinderata.widthA=slider8;
slider4==1 ? _global.tinderata.freq1A=slider6;
slider4==1 ? _global.tinderata.width1A=slider8;
slider4==2 ? _global.tinderata.freq2A=slider6;
slider4==2 ? _global.tinderata.width2A=slider8;
slider4==3 ? _global.tinderata.freq3A=slider6;
slider4==3 ? _global.tinderata.width3A=slider8;
slider4==4 ? _global.tinderata.freq4A=slider6;
slider4==4 ? _global.tinderata.width4A=slider8;
slider4==5 ? _global.tinderata.freq5A=slider6;
slider4==5 ? _global.tinderata.width5A=slider8;


// Copia il gain con segno normale o invertito in base al ruolo.
slider4==0 ? slider9==0 ? _global.tinderata.gain=-slider2;
slider4==1 ? slider9==0 ? _global.tinderata.gain1=-slider2;
slider4==2 ? slider9==0 ? _global.tinderata.gain2=-slider2;
slider4==3 ? slider9==0 ? _global.tinderata.gain3=-slider2;
slider4==4 ? slider9==0 ? _global.tinderata.gain4=-slider2;
slider4==5 ? slider9==0 ? _global.tinderata.gain5=-slider2;

slider4==0 ? slider9==1 ? _global.tinderata.gain=slider2;
slider4==1 ? slider9==1 ? _global.tinderata.gain1=slider2;
slider4==2 ? slider9==1 ? _global.tinderata.gain2=slider2;
slider4==3 ? slider9==1 ? _global.tinderata.gain3=slider2;
slider4==4 ? slider9==1 ? _global.tinderata.gain4=slider2;
slider4==5 ? slider9==1 ? _global.tinderata.gain5=slider2;

// Seconda banda.
slider4==0 ? slider9==0 ? _global.tinderata.gainA=-slider7;
slider4==1 ? slider9==0 ? _global.tinderata.gain1A=-slider7;
slider4==2 ? slider9==0 ? _global.tinderata.gain2A=-slider7;
slider4==3 ? slider9==0 ? _global.tinderata.gain3A=-slider7;
slider4==4 ? slider9==0 ? _global.tinderata.gain4A=-slider7;
slider4==5 ? slider9==0 ? _global.tinderata.gain5A=-slider7;

slider4==0 ? slider9==1 ? _global.tinderata.gainA=slider7;
slider4==1 ? slider9==1 ? _global.tinderata.gain1A=slider7;
slider4==2 ? slider9==1 ? _global.tinderata.gain2A=slider7;
slider4==3 ? slider9==1 ? _global.tinderata.gain3A=slider7;
slider4==4 ? slider9==1 ? _global.tinderata.gain4A=slider7;
slider4==5 ? slider9==1 ? _global.tinderata.gain5A=slider7;


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
slider4==0 ? slider9==0 ? slider2=-_global.tinderata.gain;
slider4==1 ? slider9==0 ? slider2=-_global.tinderata.gain1;
slider4==2 ? slider9==0 ? slider2=-_global.tinderata.gain2;
slider4==3 ? slider9==0 ? slider2=-_global.tinderata.gain3;
slider4==4 ? slider9==0 ? slider2=-_global.tinderata.gain4;
slider4==5 ? slider9==0 ? slider2=-_global.tinderata.gain5;

slider4==0 ? slider9==1 ? slider2=_global.tinderata.gain;
slider4==1 ? slider9==1 ? slider2=_global.tinderata.gain1;
slider4==2 ? slider9==1 ? slider2=_global.tinderata.gain2;
slider4==3 ? slider9==1 ? slider2=_global.tinderata.gain3;
slider4==4 ? slider9==1 ? slider2=_global.tinderata.gain4;
slider4==5 ? slider9==1 ? slider2=_global.tinderata.gain5;


// Legge le variabili globali della seconda banda.

slider4==0 ? slider6=_global.tinderata.freqA;
slider4==0 ? slider8=_global.tinderata.widthA;
slider4==1 ? slider6=_global.tinderata.freq1A;
slider4==1 ? slider8=_global.tinderata.width1A;
slider4==2 ? slider6=_global.tinderata.freq2A;
slider4==2 ? slider8=_global.tinderata.width2A;
slider4==3 ? slider6=_global.tinderata.freq3A;
slider4==3 ? slider8=_global.tinderata.width3A;
slider4==4 ? slider6=_global.tinderata.freq4A;
slider4==4 ? slider8=_global.tinderata.width4A;
slider4==5 ? slider6=_global.tinderata.freq5A;
slider4==5 ? slider8=_global.tinderata.width5A;

// Legge il gain della seconda banda in base al ruolo.
slider4==0 ? slider9==0 ? slider7=-_global.tinderata.gainA;
slider4==1 ? slider9==0 ? slider7=-_global.tinderata.gain1A;
slider4==2 ? slider9==0 ? slider7=-_global.tinderata.gain2A;
slider4==3 ? slider9==0 ? slider7=-_global.tinderata.gain3A;
slider4==4 ? slider9==0 ? slider7=-_global.tinderata.gain4A;
slider4==5 ? slider9==0 ? slider7=-_global.tinderata.gain5A;

slider4==0 ? slider9==1 ? slider7=_global.tinderata.gainA;
slider4==1 ? slider9==1 ? slider7=_global.tinderata.gain1A;
slider4==2 ? slider9==1 ? slider7=_global.tinderata.gain2A;
slider4==3 ? slider9==1 ? slider7=_global.tinderata.gain3A;
slider4==4 ? slider9==1 ? slider7=_global.tinderata.gain4A;
slider4==5 ? slider9==1 ? slider7=_global.tinderata.gain5A;



// Conversione del cursore della prima banda in frequenza.
frequenzasx = 16+slider1*1.20103;
frequenzahz = floor(exp(frequenzasx*log(1.059))*8.17742);

arc=frequenzahz*$pi/(srate*0.5);
gain=(2 ^ (slider2/6));
a=(sin(arc)*slider3) * (gain < 1 ? 1 : 0.25);
tmp=1/(1+a);


c0=tmp*a*(gain-1);
c1=tmp*2*cos(arc);
c2=tmp*(a-1);


// Conversione del cursore della seconda banda in frequenza.

frequenzasxA = 16+slider6*1.20103;
frequenzahzA = floor(exp(frequenzasxA*log(1.059))*8.17742);

arcA=frequenzahzA*$pi/(srate*0.5);
gainA=(2 ^ (slider7/6));
aA=(sin(arcA)*slider8) * (gainA < 1 ? 1 : 0.25);
tmpA=1/(1+aA);


c0A=tmpA*aA*(gainA-1);
c1A=tmpA*2*cos(arcA);
c2A=tmpA*(aA-1);



// Prima banda.

tmp=c0*(spl0-ldelay2) + c1*li1 + c2*li2;
ldelay2=ldelay1; ldelay1=spl0; 
li2=li1; spl0 += (li1=tmp);

tmp=c0*(spl1-rdelay2) + c1*ri1 + c2*ri2;
rdelay2=rdelay1; rdelay1=spl1; 
ri2=ri1; spl1 += (ri1=tmp);

// Seconda banda.

tmpA=c0A*(spl0-ldelay2A) + c1A*li1A + c2A*li2A;
ldelay2A=ldelay1A; ldelay1A=spl0; 
li2A=li1A; spl0 += (li1A=tmpA);

tmpA=c0A*(spl1-rdelay2A) + c1A*ri1A + c2A*ri2A;
rdelay2A=rdelay1A; rdelay1A=spl1; 
ri2A=ri1A; spl1 += (ri1A=tmpA);
