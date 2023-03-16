import { FonctionmaterielService } from './../../services/fonctionmateriel.service';
import { Component, OnInit } from '@angular/core';
import {FormGroup,Validators,FormBuilder} from '@angular/Forms'
import { Materiel } from '../../models/materiel';
import { StatutMateriel } from '../../models/statut-materiel';
import { TypeMateriel } from '../../models/type-materiel';
import { BonLivraison } from '../../models/bon-livraison';
import { FonctionstatutMaterielService } from '../../services/fonctionstatut-materiel.service';
import { FonctiontypeMaterielService } from '../../services/fonctiontype-materiel.service';
import { FonctionbonLivraisonService } from '../../services/fonctionbon-livraison.service';

@Component({
  selector: 'app-createmateriel',
  templateUrl: './createmateriel.component.html',
  styleUrls: ['./createmateriel.component.css']
})
export class CreatematerielComponent implements OnInit{
  myForm! : FormGroup;
  materiels: Materiel[] = [];
  statutMateriels : StatutMateriel[] = [];
  typeMateriels : TypeMateriel[] = [];
  bonLivraison : BonLivraison[] = [];


  constructor(private fb:FormBuilder,
    private functionService: FonctionmaterielService,
    private statutSercice : FonctionstatutMaterielService,
    private typeService : FonctiontypeMaterielService,
    private bonLivService : FonctionbonLivraisonService
    ){}

  ngOnInit(): void{

    this.myForm = this.fb.group({
      code:['', Validators.required],
      libelle:['', Validators.required],
      num_serie:['', Validators.required],
      marque:['', Validators.required],
      modele:['', Validators.required],
      date_enregistrement:['', Validators.required],
      statut_materiel:['', Validators.required],

      typeMateriel:['', Validators.required],
      date_utilisation:['', Validators.required],
      localmac_address:['', Validators.required],
      montant:['', Validators.required],
      debut_garantie:['', Validators.required],
      fin_garantie:['', Validators.required],
      duree_utilisation:['', Validators.required],

      bonLivraison:['', Validators.required]


    })
    // get liste(){
    //   return this.myForm.get();

    // }
   // getStatut(){
      this.statutSercice.getStautMateriel().subscribe((response : any) => {
        this.statutMateriels = response;
        console.log(response)

      })

    //}
   // getType(){
      this.typeService.getTypeMateriels().subscribe((data : any) => {
        this.typeMateriels  = data;
        console.log(data)
      });
   // }

    //getBonLivrison(){
      this.bonLivService.getBonLivraison().subscribe((donnees : any) => {
        this.bonLivraison = donnees;
        console.log(donnees)
      })
    //}


  }

  save(){
    if(this.myForm.invalid){
      alert("Veuillez remplir correctement les champs");
    }else{
      this.functionService.setMateriel(this.myForm.value).subscribe({
        next : datas => {
          console.log(datas);
          alert("succes")
        },
        error : error => {
          console.log(error)
          alert("error")
        }
      });
      console.log(this.myForm.value)
    }


  }




}
