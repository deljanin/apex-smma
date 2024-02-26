<script>
    import logoDark from "$lib/assets/LogoDark.svg";
    import langIcon from "$lib/assets/langIcon.svg";
    
    import {languageData} from '$lib/languageData.js';

    import { txt } from '$lib/context.js';
    import { page } from '$app/stores'; 
    var lng = 'en';
    function handleLanguageChange() {
        lng = lng === 'en' ? 'sr' : 'en';
        txt.set(languageData[lng]);
    }
</script>
<nav>
    <div>
     <a href="/">
         <img src={logoDark} alt="Logo"> 
     </a>
     
     <ul>
        {#if $page.url.pathname === '/terms_and_conditions' || $page.url.pathname === '/privacy_policy'}
            {#each $txt.navbarAlt as link}
                <li><a href={link.link}>{link.text}</a></li>
            {/each}  
        {:else}
            {#each $txt.navbar as link}
                <li><a href={link.link}>{link.text}</a></li>
            {/each}  
        {/if} 
    </ul>
    <img src={langIcon} on:click={handleLanguageChange} alt="Language change button">
    </div>
 </nav>
<slot/>

<style>
    a > img{
        width: 60px;
        height: auto;
    }
    img{
        cursor: pointer;
        width: 50px;
    }
    nav {
        width: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    div{
        position: absolute;
        top: 25px;
        padding: 20px;
        border-radius: 15px;
        width: 50%;
        height: 70px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: var(--secondary-color);
        z-index: 2;
    }
    ul{
        width: 70%;
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        
    }
    li{
        list-style: none;
    }
    li > a{
        font-family: 'Coolvetica';
        font-size: 1.8em;
        color: var(--primary-color);
        text-decoration: none;
    }
</style>